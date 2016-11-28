let path = require('path');
let express = require('express');
let http = require('http');
let https = require('https');
let fs = require('fs');

let app = express();
app.disable(‘x-powered-by’);

app.use(require('morgan')('tiny'));
app.use(express.static(path.join(__dirname + '/dist')));
app.use(function(err,req,res,next){
    res.sendfile(path.join(__dirname,'dist','index.html'));
});

http.createServer(app).listen(80);

let key = path.join(__dirname,'/https','ssl.key');
let cert = path.join(__dirname,'/https','ssl.crt');
if(fs.existsSync(key) && fs.existsSync(cert)){
    https.createServer({
        key:fs.readFileSync(key),
        cert:fs.readFileSync(cert)
    },
    app
    ).listen(443);
}


