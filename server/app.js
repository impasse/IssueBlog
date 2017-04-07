const path = require('path');
const os = require('os');
const Koa = require('koa');
const convert = require('koa-convert');
const koaBetterBody = require('koa-better-body');
const koaCompress = require('koa-compress');
const koaConditionalGet = require('koa-conditional-get');
const koaEtag = require('koa-etag');
const koaLogger = require('koa-logger');
const koaResponseTime = require('koa-response-time');
const koaSession = require('koa-session');
const koaStatic = require('koa-static');

const { keys } = require('./config');

const app = new Koa();

app.keys = keys;

const oneMonth = 30 * 24 * 60 * 60 * 1000;

app.use(koaResponseTime());
app.use(koaLogger());
app.use(koaCompress());
app.use(koaConditionalGet());
app.use(koaEtag());
app.use(koaStatic(path.join(__dirname, '..', 'dist'), {
    index: false,
    maxage: oneMonth
}));
app.use(koaSession({
    maxAge: oneMonth
}, app));
app.use(convert(koaBetterBody({
  uploadDir: os.tmpdir() || path.join(__dirname, 'uploads/')
})));

app.use(...require('./routes'));


module.exports = app;
