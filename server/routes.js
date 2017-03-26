const qs = require('querystring');
const crypto = require('crypto');
const env = require('process').env;
const router = require('koa-router')();
const send = require('koa-send');
const request = require('request-promise');

const client_id = env.CLIENT_ID;
const client_secret = env.CLIENT_SECRET;

router.get('/', async ctx => {
    await send(ctx, 'dist/index.html', {
        maxAge: 0
    });
});

router.get('/api/authorize', async ctx => {
    const query = {
        client_id,
        client_secret,
        redirect_uri: `${ctx.request.protocol}://shyling.com/api/code`,
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
    delete ctx.session.token;
    ctx.status = 200;
});

module.exports = [router.routes(), router.allowedMethods()];
