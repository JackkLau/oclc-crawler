const axios = require('axios');
const qs = require('querystring');
const {ua, cookie, newrelic} = require("./configs/config");


const {HttpsProxyAgent} = require('https-proxy-agent');
const fetch = require("node-fetch"); // isomorphic-fetch 也是相同的设置
const proxyIp = '127.0.0.1'; // 可以配置到配置文件里，根据不同环境的需要进行设置
const proxyPort = '7890';


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
        offset,
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
    const fetchParam = {
        method: 'GET',
        url,
        headers,
        agent: new HttpsProxyAgent("http://" + proxyIp + ":" + proxyPort)
    }

    let result = {
        briefRecords: [],
        numberOfRecords: 0
    };

    try {
        console.log('请求链接为 :>>', url);
        const res = await fetch(url, fetchParam).then(res => res.json());
        if (res.briefRecords) {
            result = res;
        } else {
            console.log('未正常获取数据 :>>', res);
            new Error(
                `执行失败，当前执行进度：
                   出版社：${publisher} 
                   当前页数：${offset}  
            `)
        }
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