const getBookList = require('./getBookList');
const getBookListFetch = require('./getBookListFetch');
const {sleep} = require('./utils');
const saveToFile = require('./saveToFile');
const fetchCookie = require('./fetchCookie');

async function startCrawler(publisher, publishYear) {
    let cookie = await fetchCookie();
    let totalPage = 1000;
    for (let i = 0; i <= totalPage; i++) {
        console.log(`正在请求出版社：${publisher} ${publishYear} 年出版的第 ${i} 页数据`);
        // const bookListResp = await getBookList(publisher, i);
        let bookListResp;
        const offset = 50 * i + 1;
        try {
            bookListResp = await getBookListFetch(publisher, publishYear, offset, cookie);
        } catch (e) {
            console.log('startCrawler 捕获错误，正在重新执行 :>>', e);
            cookie = await fetchCookie();
            bookListResp = await getBookListFetch(publisher, publishYear, offset, cookie);
        }

        const currentCount = bookListResp.numberOfRecords;
        totalPage = Math.ceil(currentCount / 50);
        if (totalPage === 0) {
            console.log('当前出版社真实存在图书数据为 :>>', offset);
            break;
        }
        console.log(`出版社：${publisher} 共有 ${totalPage} 页数据，本次请求${currentCount}条数据，正在将第 ${i} 页数据请求成功，准备写入文件`);
        if (currentCount > 0) {
            await saveToFile(publisher, bookListResp, cookie);
            console.log(`出版社：${publisher} 的第 ${i} 页数据数写入功`);
        }
        await sleep(20);

    }
}


module.exports = startCrawler;
