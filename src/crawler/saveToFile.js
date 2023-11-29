const fs = require('fs/promises');
const transDataToCSV = require("./transDataToCSV");

async function saveToFile(publisher, data) {
    const folderPath = './results/'
    const isFolderExist = await fs.stat(folderPath).catch( e => false);
    if (!isFolderExist) {
       await fs.mkdir(folderPath)
    }
    const csv = await transDataToCSV(data.briefRecords);
    await fs.appendFile(`${folderPath}${publisher}.csv`, csv + '\n', 'utf-8').catch(e => console.log('写入文件异常', e));

    for (let i = 0; i < data.briefRecords.length; i++) {
        const briefRecord = JSON.stringify(data.briefRecords[i])
        await fs.appendFile(`${folderPath}${publisher}.json`, briefRecord + ',', 'utf-8').catch(e => console.log('写入文件异常', e));
    }
}

module.exports = saveToFile;