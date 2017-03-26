const path = require('path');
const http = require('http');
const https = require('https');
const fs = require('fs');

const app = require('./server/app');

http.createServer(app.callback()).listen(80);

const key = path.join(__dirname, '/https', 'ssl.key');
const cert = path.join(__dirname, '/https', 'ssl.crt');

if (fs.existsSync(key) && fs.existsSync(cert)) {
    https.createServer({
        key: fs.readFileSync(key),
        cert: fs.readFileSync(cert)
    },
        app.callback()
    ).listen(443);
}
