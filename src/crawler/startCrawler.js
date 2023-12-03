const getBookList = require('./getBookList');
const getBookListFetch = require('./getBookListFetch');
const {sleep} = require('./utils');
const saveToFile = require('./saveToFile');
const fetchCookie = require('./fetchCookie');

async function startCrawler(publisher) {
    const cookie = await fetchCookie();
    let totalPage = 1000;
    for (let i = 0; i <= totalPage; i++) {
        console.log(`正在请求出版社：${publisher} 的第 ${i} 页数据`);
        // const bookListResp = await getBookList(publisher, i);
        let bookListResp;
        const offset = 50 * i + 1;
        try {
            bookListResp = await getBookListFetch(publisher, offset, cookie);
        } catch (e) {
            console.log('startCrawler 捕获错误，正在重新执行 :>>', e);
            const newCookie = await fetchCookie();
            bookListResp = await getBookListFetch(publisher, offset, newCookie);
        }

        const currentCount = bookListResp.numberOfRecords;
        totalPage = Math.ceil(currentCount / 50);
        if (totalPage === 0) {
            console.log('当前出版社真实存在图书数据为 :>>', offset);
            break;
        }
        console.log(`出版社：${publisher} 共有 ${totalPage} 页数据，本次请求${currentCount}条数据，正在将第 ${i} 页数据请求成功，准备写入文件`);
        if (currentCount > 0) {
            await saveToFile(publisher, bookListResp);
            console.log(`出版社：${publisher} 的第 ${i} 页数据数写入功`);
        }
        await sleep(20);

    }
}


module.exports = startCrawler;
