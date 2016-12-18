let path = require('path');
let express = require('express');
let http = require('http');
let https = require('https');
let fs = require('fs');

let app = express();

app.disable('x-powered-by');
app.set('env', 'production');

app.use(require('morgan')('tiny'));
app.use(require('compression')());
// Content-Security-Policy
app.use(function (req, res, next) {
    if (req.secure && req.get('Upgrade-Insecure-Requests') == 1) {
        res.set('Content-Security-Policy', 'upgrade-insecure-requests');
    }
    next();
});

app.use(express.static(path.join(__dirname + '/dist'), {
    maxAge: 1e3 * 3600 * 24,
    setHeaders: function (res, path, stat) {
        console.log(path);
        if (path.endsWith('index.html')) {
            res.set('Cache-Control', 'private, max-age=0');
        }
    }
}));

http.createServer(app).listen(80);

let key = path.join(__dirname, '/https', 'ssl.key');
let cert = path.join(__dirname, '/https', 'ssl.crt');

if (fs.existsSync(key) && fs.existsSync(cert)) {
    https.createServer({
        key: fs.readFileSync(key),
        cert: fs.readFileSync(cert)
    },
        app
    ).listen(443);
}


