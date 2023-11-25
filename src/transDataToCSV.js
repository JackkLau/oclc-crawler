const {AsyncParser} = require('@json2csv/node');


const opts = {
    fields: [
        {
            label: 'oclc编号 - oclcNumber',
            value: 'oclcNumber'
        },
        {
            label: '书号 - isbns',
            value: (record) => record.isbns?.join?.(',')
        },
        {
            label: '书名 - title',
            value: 'title'
        },
        {
            label: '作者 - creator',
            value: 'creator'
        },
        {
            label: '出版日期 - publicationDate',
            value: 'publicationDate'
        },
        {
            label: '语言 - catalogingLanguage',
            value: 'catalogingLanguage'
        },
        {
            label: '格式 - generalFormat',
            value: 'generalFormat'
        },
        {
            label: '详细格式 - specificFormat',
            value: 'specificFormat'
        },
        {
            label: '版本 - edition',
            value: 'edition'
        },
        {
            label: '总版本数 - totalEditions',
            value: 'totalEditions'
        },
        {
            label: '出版社 - publisher',
            value: 'publisher'
        },
        {
            label: '出版地 - publicationPlace',
            value: 'publicationPlace'
        },
        {
            label: '主题 - subjects',
            value: (record) => record.subjects?.join(',')
        },
        {
            label: '简介 - summaries',
            value: (record) => record.summaries?.join(',')
        },
        {
            label: '是否同行审阅 - peerReviewed',
            value: (record) =>record.peerReviewed ? '是': '否'
        },
    ]
};
const transformOpts = {};
const asyncOpts = {};
const parser = new AsyncParser(opts, asyncOpts, transformOpts);


async function transDataToCSV(originData = []) {
    // const json = originData?.map(v => format(v) );
    const csv = await parser.parse(originData).promise();
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