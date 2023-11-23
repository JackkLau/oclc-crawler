const {AsyncParser} = require('@json2csv/node');

const parser = new AsyncParser();


async function transDataToCSV(originData = {}) {
    const json = originData?.map(v => format(v) );
    const csv = await parser.parse(json).promise();
    // console.log('csv :>>', csv);
    console.log('csv 转换成功', originData?.length);
    return csv;
}

function format(originData) {
    return {
        "oclc编号 - oclcNumber": originData.oclcNumber,
        "书号 - isbns": originData.isbns?.join(','),
        "书名 - title": originData.title,
        "作者 - creator": originData.creator,
        "出版日期 - publicationDate": originData.publicationDate,
        "语言 - catalogingLanguage": originData.catalogingLanguage,
        "格式 - generalFormat": originData.generalFormat,
        "详细格式 - specificFormat": originData.specificFormat,
        "版本 - edition": originData.edition,
        "总版本数 - totalEditions": originData.totalEditions,
        "出版社 - publisher": originData.publisher,
        "出版地 - publicationPlace": originData.publicationPlace,
        "主题 - subjects": originData.subjects?.join(','),
        "简介 - summaries": originData.summaries?.join(','),
        "是否同行审阅 - peerReviewed": originData.peerReviewed ? '是': '否'
    }
}


module.exports = transDataToCSV;