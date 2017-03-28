const qs = require('querystring');
const crypto = require('crypto');
const env = require('process').env;
const router = require('koa-router')();
const send = require('koa-send');
const request = require('request-promise').defaults({
  headers: {
    'User-Agent': 'IssueBlog'
  }
});
const { client_id, client_secret } = require('./config');

async function fallback(ctx) {
    ctx.set('Cache-Control', 'no-cache');
    await send(ctx, 'dist/index.html', {
        maxAge: 0
    });
}

router.get('/', fallback);

router.get('/api/authorize', async ctx => {
    const query = {
        client_id,
        client_secret,
        redirect_uri: 'http://shyling.com/api/code',
        scope: 'public_repo',
        allow_signup: true,
        state: crypto.pseudoRandomBytes(3).toString('hex')
    };
    ctx.body = `<script>document.location.href= 'https://github.com/login/oauth/authorize?${qs.stringify(query)}'</script>`;
});

router.get('/api/code', async ctx => {
    ctx.body = `<script>
    opener.postMessage({ code: '${ctx.query.code}' }, '*');
    window.close();
    </script>
    `;
});

router.post('/api/token', async ctx => {
    ctx.body = ctx.session.token = await request({
        uri: 'https://github.com/login/oauth/access_token',
        json: {
            client_id,
            client_secret,
            code: ctx.request.fields.code
        }
    });
});

router.get('/api/token', async ctx => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = ctx.session.token || {};
});

router.post('/api/logout', async ctx =>{
    await request.delete(`https://${client_id}:${client_secret}@api.github.com/applications/${client_id}/grants/${ctx.session.token.access_token}`);
    delete ctx.session.token;
    ctx.status = 200;
});

router.get('*', fallback);

module.exports = [router.routes(), router.allowedMethods()];
