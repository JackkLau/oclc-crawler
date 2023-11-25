const fetch = require("node-fetch");
const agent = require('./getAgent');


fetch('https://search.worldcat.org/api/access-tokens/auth_kWyvZKoTnlZ6J1fk2EUX6yxrIyepEmaQMc0A?email=true', {agent}).then(res =>res.json()).then(res => {
    console.log('res :>>', res);
})