const getBookList = require('./getBookList');
const getBookListFetch = require('./getBookListFetch');
const {sleep} = require('./utils');
const saveToFile = require('./saveToFile');
const fetchCookie = require('./fetchCookie');

async function startCrawler(publisher) {
    const cookie = await fetchCookie();
    let totalPage = 1000;
    for (let i = 1; i <= totalPage; i++) {
        console.log(`正在请求出版社：${publisher} 的第 ${i} 页数据`);
        // const bookListResp = await getBookList(publisher, i);
        let bookListResp;
        try {
            bookListResp = await getBookListFetch(publisher, i, cookie);
        } catch (e) {
            const cookie = await fetchCookie();
            bookListResp = await getBookListFetch(publisher, i, cookie);
        }

        console.log('bookListResp.numberOfRecords :>>', bookListResp.numberOfRecords);
        totalPage = Math.ceil(bookListResp.numberOfRecords / 50);
        console.log(`出版社：${publisher} 共有 ${totalPage} 页数据，正在的第 ${i} 页数据请求成功，准备写入文件`);
        await saveToFile(publisher, bookListResp);
        console.log(`出版社：${publisher} 的第 ${i} 页数据数写入功`);
        await sleep(20);
    }
}


module.exports = startCrawler;
