const axios = require('axios');
const qs = require('querystring');
const {ua, cookie, newrelic} = require("./configs/config");

// axios 执行时配置走本地 代理存在问题，此方法不可用
// 解决请求代理问题 https://www.jianshu.com/p/8021d8851775
const {HttpsProxyAgent} = require("https-proxy-agent");
const tunnel = require("tunnel");

async function getBookList(publisher, offset = 1) {
    const search = {
        q: `pb:${publisher}`,
        content: 'nonFic',
        datePublished: '2018-2022',
        itemSubType: 'book-printbook',
        orderBy: 'mostWidelyHeld',
        preferredLanguage: 'chi',
        topic: '34000000',
    }
    const page = {
        limit: 50,
        offset: offset,
    }
    // 仅包含筛选条件的查询字符串参数
    const filterQS = qs.stringify(search);
    // 包含筛选条件和分页信息的查询字符串
    const fullQS = qs.stringify({...search, ...page})
    const url = `https://search.worldcat.org/api/search?${fullQS}`
    const referer = `https://search.worldcat.org/zh-cn/search?${filterQS}`
    const headers = {
        'User-Agent': ua,
        'Content-Type': 'application/json; charset=utf-8',
        'Cookie': cookie?.trim(),
        'Referer': referer
    };
    const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:7890`, {headers: headers});

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url,
        headers,
        proxy: false,
        httpsAgent: tunnel.httpsOverHttp({
            proxy: {
                host: '127.0.0.1',//代理服务器域名或者ip
                port: 7890 //代理服务器端口
            }
        }),
    };

    let result = {
        briefRecords: [],
        numberOfRecords: 0
    };

    try {
        result = await axios.request(config).then(res => JSON.stringify(res.data));
    } catch (e) {
        console.log('getBookList 请求出错', e.message, e.stack);
        throw new Error(
            `执行失败，当前执行进度：
           出版社：${publisher} 
           当前页数：${offset}  
        `)
    }
    return result;
}

module.exports = getBookList