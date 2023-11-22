const axios = require('axios');
const qs = require('querystring');

async function getBookList(publisher, offset = 1) {
    const search = {
        q: encodeURIComponent(`pb:${publisher}`),
        content: 'nonFic',
        datePublished: '2018-2022',
        itemSubType: 'book-printbook',
        orderBy: 'mostWidelyHeld',
        preferredLanguage: 'chi',
        topic: '34000000',
    }
    const page = {
        limit: 50,
        offset,
    }
    // 仅包含筛选条件的查询字符串参数
    const filterQS = qs.stringify(search);
    // 包含筛选条件和分页信息的查询字符串
    const fullQS = qs.stringify({...search, ...page})
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://search.worldcat.org/api/search?${fullQS}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Cookie': '_ga=GA1.1.519372477.1700576334; wc_location=%7B%22latitude%22%3A34.6946%2C%22longitude%22%3A135.5021%2C%22city%22%3A%22Osaka%22%2C%22shortCity%22%3A%22Osaka%22%2C%22state%22%3A%22%C5%8Csaka%22%2C%22shortState%22%3A%2227%22%2C%22country%22%3A%22Japan%22%2C%22shortCountry%22%3A%22JP%22%2C%22formattedAddress%22%3Anull%7D; _pin_unauth=dWlkPVltUXlNbUkyTURFdE9ETmhNQzAwTTJJM0xXRmhNakl0TnpWaFpqSTROemcwTmpjNQ; OptanonAlertBoxClosed=2023-11-21T14:18:57.662Z; wc_auth_inst_id=140300; wc_inst_privileges=%5B%5D; wc_lang=zh-cn; _cfuvid=JNt5NITnIfTJInYfTCezMm_htOliF2icTvB9IwBJulM-1700659529278-0-604800000; wc_atoken=tk_ELX61Mi3a6JZ8S7ukyAtCMx4dOjDgat6qLz7; wc_atoken_cs=null; __cf_bm=kFd8E7lMd17GWbHpYK_Jtijlz85Yt7KgLPXlBO3WGIs-1700661170-0-AWt0Wb6KjPvbfp92tpxwjC353kNoTw5O+USufkSd809g44T+l9SJhvBPRM951lJJsI8056wzQ5odKkQjHHMH1V0=; TS01964259=011e52333594d0f0513e0c6be393f6c9fb1080a5fc221bb78c845d12f144901b0803d49aebc6b1628815d8b78118d7c8a9fafe2da2d123d4445292b6bae8d13c390d568f0a5c1aeedccc2ae25a814a5d7cad143360040bf20f8582a9977ddec4f89b4f389cba4dd67d7f7c8ff53b297aeb4af3980b29b4915164948b60983aaff27b9b3575; wc_tkn=sSFvXJi0jRSZsA6WFXiFrw%3D%3D; OptanonConsent=isGpcEnabled=0&datestamp=Wed+Nov+22+2023+22%3A04%3A46+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202308.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=538fd0bd-86d0-4dd4-9b34-079b94646608&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0004%3A1&geolocation=%3B&AwaitingReconsent=false; _ga_C9J93E8RHJ=GS1.1.1700661883.3.0.1700661890.0.0.0; wc_source_request_id=54999397-b00d-41ae-be64-d92529b2451d',
            'Newrelic': 'eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjMzMDcwMjciLCJhcCI6IjkwMTY3NDk0NCIsImlkIjoiZWJkYTJmYjVjY2I3YjkxZSIsInRyIjoiNWVmMjA2NTFkNzEzZDg3NzI2Yjg0ODQxNmJkMjhkMGYiLCJ0aSI6MTcwMDY2MTg5NjA3OH19',
            'Referer': `https://search.worldcat.org/zh-cn/search?${filterQS}`
        }
    };

    let result = {
        briefRecords: [],
        numberOfRecords: 0
    };
    try {
        result = await axios.request(config).then(res =>JSON.stringify(res.data));
    } catch (e) {
        console.log('getBookList 请求出错', e.message, e.stack);
        throw new Error(
        `执行失败，当前执行进度：
           出版社：${publisher} 
           当前页数：${offset}  
        `)
    }
    return result;
}

module.exports = getBookList