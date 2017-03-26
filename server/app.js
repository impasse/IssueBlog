const path = require('path');
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

app.use(koaResponseTime());
app.use(koaLogger());
app.use(koaCompress());
app.use(koaConditionalGet());
app.use(koaEtag());
app.use(koaStatic(path.join(__dirname, '..', 'dist'), {
    index: false,
    maxage: 1e3 * 3600 * 24 * 30
}));
app.use(koaSession(app));
app.use(convert(koaBetterBody()));

app.use(...require('./routes'));


module.exports = app;