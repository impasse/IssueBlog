const crypto = require('crypto');
const env = require('process').env;

module.exports = {
    keys: [ env.KEY ],
    // keys: ['awhzUxNPNvQ9JeAd8KnVuBsCDSyxR0r4pDL/aupk/iLS6cuRaRBNlQnN7lXFZZTzUiGa2fpvRlwN0V9S+EWJPg==']
    // keys: [ crypto.pseudoRandomBytes(64).toString('base64') ]
    client_id: env.CLIENT_ID,
    client_secret: env.CLIENT_SECRET
};