const fetch = require('node-fetch');
const agent = require('./getAgent');


module.exports = function fetchCookie() {
    return fetch('https://search.worldcat.org/zh-cn/search', {agent})
        .then(res => res.text())
        .then(res => {
            const re = /,"secureToken":"(.*)","insightsToggle"/;
            const cookieValue = re.exec(res)[1];
            const cookie = `wc_tkn=${encodeURIComponent(cookieValue)}`;
            console.log('res :>>', re.exec(res)[0], cookie);
            return cookie;
        });
};

