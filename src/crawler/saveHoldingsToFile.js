const fs = require('fs/promises');
const transHoldingsDataToCSV = require('./transHoldingsDataToCSV');
async function saveHoldingsToFile(oclcNumber, publisher, data) {
    const folderPath = './holdings-results/'
    const isFolderExist = await fs.stat(folderPath).catch( e => false);

    if (!isFolderExist) {
       await fs.mkdir(folderPath)
    }

    const holdings = data.holdings;
    for (let i = 0; i < holdings.length; i++) {
        const record = holdings[i]
        record.oclcNumber = oclcNumber;
        const recordStr = JSON.stringify(record)
        await fs.appendFile(`${folderPath}${publisher}.json`, recordStr + ',', 'utf-8').catch(e => console.log('写入文件异常', e));
    }

    const csv = await transHoldingsDataToCSV(holdings);
    await fs.appendFile(`${folderPath}${publisher}.csv`, csv + '\n', 'utf-8').catch(e => console.log('写入文件异常', e));

}

module.exports = saveHoldingsToFile;