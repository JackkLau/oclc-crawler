const {AsyncParser} = require('@json2csv/node');


const opts = {
    fields: [
        {
            label: 'oclc号 - oclcNumber',
            value: 'oclcNumber'
        },
        {
            label: 'oclc符号 - oclcSymbol',
            value: 'oclcSymbol'
        },
        {
            label: '注册ID - registryId',
            value: 'registryId'
        },
        {
            label: '机构名称 - institutionName',
            value: 'institutionName'
        },
        {
            label: '机构类型 - institutionType',
            value: 'institutionType'
        },
        {
            label: '别称 - alsoCalled',
            value: 'alsoCalled'
        },
        {
            label: '街道 - street1',
            value: 'street1'
        },
        {
            label: '城市 - city',
            value: 'city'
        },
        {
            label: '邮政编码 - postalCode',
            value: 'postalCode'
        },
        {
            label: '国家 - country',
            value: 'country'
        },
        {
            label: '经度 - longitude',
            value: 'longitude'
        },
        {
            label: '纬度 - latitude',
            value: 'latitude'
        },
        {
            label: '距离 - distance',
            value: 'distance'
        },
        {
            label: '距离单位 - distanceUnit',
            value: 'distanceUnit'
        },
    ]
};
const transformOpts = {};
const asyncOpts = {};
const parser = new AsyncParser(opts, asyncOpts, transformOpts);


async function transHoldingsDataToCSV(originData = []) {
    // const json = originData?.map(v => format(v) );
    const csv = await parser.parse(originData).promise();
    // console.log('csv :>>', csv);
    console.log('csv 转换成功', originData?.length);
    return csv;
}


module.exports = transHoldingsDataToCSV;