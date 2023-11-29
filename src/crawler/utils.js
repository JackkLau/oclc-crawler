/**
 * 随机睡眠等待函数， 强制程序等待
 * @param interval 等待的最长秒数
 *
 * */
function sleep(interval = 1) {
    const timeout = random(interval) * 1000 + random();
    return new Promise((resolve) => {
        console.log(`睡眠 ${timeout} 毫秒后进行下一次数据请求`);
        setTimeout(resolve, timeout)
    })
}


/**
 *
 * 生成一个指定位数的随机数
 * @param {number} digit 指定位数
 * 例如 digit 为 100，即随机生成一个 1 到 100 以内的随机书
 * */
function random(digit = 1000) {
    if (digit > 2 ** (52 - 1)) digit = 2 ** (52 - 1);
    return Math.floor(Math.random() * digit + 1);
}

module.exports = {
    sleep,
    random,
}

