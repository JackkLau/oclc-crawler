const {readFileSync} = require("fs");
const path = require("path");


const curPath = path.resolve('src', 'configs');
// const cookie = readFileSync(path.join(curPath, 'cookie'), 'utf-8');
const newrelic = readFileSync(path.join(curPath, 'newrelic'), 'utf-8');

module.exports = {
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    // cookie: cookie,
    newrelic: newrelic
}