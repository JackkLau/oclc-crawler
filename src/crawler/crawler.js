const startCrawler = require('./startCrawler');
const {sleep} = require('./utils');
const fetchCookie = require('./fetchCookie');

async function start() {
    const publishers = [
        // '中华书局',
        // '中国社会科学出版社',
        // '社会科学文献出版社',
        // '商务印书馆',
        // '人民出版社',
        // '科学出版社',
        // '江苏凤凰文艺出版社',
        // '上海古籍出版社',
        // '广西师范大学出版社',
        // '上海人民出版社',
        // '人民文学出版社',
        // '北京大学出版社',
        // '中国中医药出版社',
        // '中国文史出版社',
        // '人民邮电出版社',
        // '接力出版社',
        // '法律出版社',
        // "上海外语教育出版社",
        // "外语教学与研究出版社",
        "上海外语教育出版社全",
        "外语教学与研究出版社全",
        // "外研社", // 用此名字检索近五年无图书
    ];
    const publishYears = []
    const countOfPublishers = publishers.length;
    for (let i = 0; i < countOfPublishers; i++) {
        let year = 2018;
        for (;year < 2024; year++) {
            await startCrawler(publishers[i], year);
        }

            // await sleep(20);
    }
}

const startTime = Date.now();
console.log('程序开始执行', startTime);
start().then(() => {
    const duration = (Date.now() - startTime) / 1000;
    console.log('程序共计执行时间', duration, '秒');
    console.log('程序正常完成执行');
}).catch(async err => {
    const duration = (Date.now() - startTime) / 1000;
    console.log('程序共计执行时间', duration, '秒');
    console.log('程序异常 :>>', err);
});

