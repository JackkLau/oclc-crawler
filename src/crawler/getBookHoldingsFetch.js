const qs = require('querystring');
const {ua} = require('./configs/config');
const fetch = require('node-fetch'); // isomorphic-fetch 也是相同的设置
const agent = require('./getAgent');

/**
 *
 * 查询每本书的馆藏数
 * @param oclcNumber 书本 oclc 编号
 * @param offset 查询页数
 * @param cookie 登录态
 * */
async function getBookHoldingsFetch(oclcNumber, offset, cookie) {
    const search = {
        oclcNumber,
        format: 'book-printbook',
        allEditions: false,
        showPublicOnly: false,
        favoriteIds: null,
        lat: 50.1188,
        lon: 8.6843,
        distance: 0,
        unit: 'K',
        type: 'syndicated'
    };
    const page = {
        limit: 50,
        offset
    };

    // 包含筛选条件和分页信息的查询字符串
    const fullQS = qs.stringify({...search, ...page}).replace(/\n+\s+/g, '');
    const url = `https://search.worldcat.org/api/search-holdings?${fullQS}`;
    const referer = `https://search.worldcat.org/zh-cn/title/${oclcNumber}`;
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
        holdings: [], totalHoldingCount: 0
    };

    try {
        console.log('请求链接为 :>>', url);
        const res = await fetch(url, fetchParam).then(res => res.json());
        if (res.holdings) {
            result = res;
        } else if (res.message?.includes('search-holdings bad result')) {

        } else {
            console.log('未正常获取数据 :>>', res);
            throw new Error(`执行失败，当前执行进度：
                   书籍：${oclcNumber} 
                   当前页数：${offset}  
            `);
        }
    } catch (e) {
        console.log('getBookList 请求出错', e.message, e.stack);
        throw new Error(`执行失败，当前执行进度：
           书籍：${oclcNumber} 
           当前页数：${offset}  
        `);
    }
    return result;
}

module.exports = getBookHoldingsFetch;