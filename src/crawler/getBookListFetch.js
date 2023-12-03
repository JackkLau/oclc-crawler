const axios = require('axios');
const qs = require('querystring');
const {ua, cookie, newrelic} = require('./configs/config');
const fetch = require('node-fetch'); // isomorphic-fetch 也是相同的设置
const agent = require('./getAgent')

async function getBookListFetch(publisher, offset, cookie) {
    const search = {
        q: `pb:${publisher}`,
        content: 'nonFic',
        datePublished: '2018-2022',
        // itemSubType: 'book-printbook',
        itemSubType: 'book-printbook,book-digital',
        itemType: 'snd,video,audiobook',
        orderBy: 'mostWidelyHeld',
        audience: 'nonJuv',
        preferredLanguage: '',
        topic: '34000000', // 主题编号
    };
    const page = {
        limit: 50,
        offset
    };
    // 仅包含筛选条件的查询字符串参数
    const filterQS = qs.stringify(search).replace(/\n+\s+/g, '');
    // 包含筛选条件和分页信息的查询字符串
    const fullQS = qs.stringify({...search, ...page}).replace(/\n+\s+/g, '');
    const url = `https://search.worldcat.org/api/search?${fullQS}`;
    const referer = `https://search.worldcat.org/zh-cn/search?${filterQS}`;
    const headers = {
        'User-Agent': ua,
        'Content-Type': 'application/json; charset=utf-8',
        'Cookie': cookie?.trim(),
        'Referer': referer
    };
    const fetchParam = {
        method: 'GET', url, headers, agent: agent
    };

    let result = {
        briefRecords: [], numberOfRecords: 0
    };

    try {
        console.log('请求链接为 :>>', url);
        const res = await fetch(url, fetchParam).then(res => res.json());
        if (res.briefRecords) {
            result = res;
        } else if( res.message.include('bad search result')) {

        } else {
            console.log('未正常获取数据 :>>', res);
            throw new Error(`执行失败，当前执行进度：
                   出版社：${publisher} 
                   当前页数：${offset}  
            `);
        }
    } catch (e) {
        console.log('getBookList 请求出错', e.message, e.stack);
        throw new Error(`执行失败，当前执行进度：
           出版社：${publisher} 
           当前页数：${offset}  
        `);
    }
    return result;
}

module.exports = getBookListFetch;