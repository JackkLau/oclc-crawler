const {sleep} = require('./utils');
const fetchCookie = require('./fetchCookie');
const getBookHoldingsFetch = require('./getBookHoldingsFetch');
const saveHoldingsToFile = require('./saveHoldingsToFile');


/**
 * 
 * 抓取每本书的藏馆数据
 *
 * */
module.exports = async function startHoldings(bookInfo, cookie, publisher) {
    const oclcNumber = bookInfo.oclcNumber;
    const bookName = bookInfo.title;
    let totalPage = 1000;
    for (let i = 0; i <= totalPage; i++) {
        console.log(`正在请求书籍：${bookName}-${oclcNumber} 出版的第 ${i} 页数据`);
        const offset = 50 * i + 1;
        let resp;
        try {
            resp = await getBookHoldingsFetch(oclcNumber, offset, cookie);
        } catch (e) {
            console.log('startCrawler 捕获错误，正在重新执行 :>>', e);
            cookie = await fetchCookie();
            resp = await getBookHoldingsFetch(oclcNumber, offset, cookie);
        }

        const currentCount = resp.totalHoldingCount;
        totalPage = Math.ceil(currentCount / 50);
        if (totalPage === 0) {
            console.log('当前出版社真实存在图书数据为 :>>', offset);
            break;
        }
        console.log(`书籍：${bookName}-${oclcNumber} 共有 ${totalPage} 页数据，本次请求${currentCount}条数据，正在将第 ${i} 页数据请求成功，准备写入文件`);
        if (currentCount > 0) {
            await saveHoldingsToFile(oclcNumber, publisher, resp);
            console.log(`书籍：${oclcNumber} 的第 ${i} 页数据数写入功`);
        }
        await sleep(20);

    }

}

