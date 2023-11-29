const mockData= require('./mockData');
const transDataToCSV = require("../src/crawler/transDataToCSV");
const saveToFile = require("../src/crawler/saveToFile");

(async () => {
    await saveToFile('社会科学文献出版社', mockData);
})()