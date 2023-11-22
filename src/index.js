const startCrawler = require('./startCrawler')
const {sleep} = require("./utils");

async function start() {
    const publishers = [
        "中华书局",
        "中国社会科学出版社",
        "社会科学文献出版社",
        "商务印书馆",
        "人民出版社",
        "科学出版社",
        "江苏凤凰文艺出版社",
        "上海古籍出版社",
        "广西师范大学出版社",
        "上海人民出版社",
        "人民文学出版社",
        "北京大学出版社",
        "中国中医药出版社",
        "中国文史出版社",
        "人民邮电出版社",
        "接力出版社",
        "法律出版社",
    ]
    const countOfPublishers = publishers.length;
    try {
        for (let i = 0; i < countOfPublishers; i++) {
            await startCrawler(publishers[i]);
            await sleep(20);
        }
    } catch (e) {
        throw e;
    }
}

console.log('程序开始执行');
start().then(() => {
    console.log('程序正常完成执行');
}).catch(console.error);

