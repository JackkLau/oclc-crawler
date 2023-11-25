const {HttpsProxyAgent} = require('https-proxy-agent');
const proxyIp = '127.0.0.1'; // 可以配置到配置文件里，根据不同环境的需要进行设置
const proxyPort = '7890';

module.exports = new HttpsProxyAgent("http://" + proxyIp + ":" + proxyPort)