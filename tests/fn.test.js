const mockData= require('../src/mockData');
const transDataToCSV = require("../src/transDataToCSV");
const saveToFile = require("../src/saveToFile");

(async () => {
    await saveToFile('社会科学文献出版社', mockData);
})()