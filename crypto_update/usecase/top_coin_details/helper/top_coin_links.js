const axios = require('axios');
const cheerio = require('cheerio');

const topCoinLinks = async () => {
    const topCoinPageURL =  "https://coinmarketcap.com/coins/";
    const topCoinPage = await axios.get(topCoinPageURL);
    const $ = cheerio.load(topCoinPage.data);
    const topCoinList = [];
    $('tbody').find('tr').each(function (i, elem) {
        var url = $(this).find('a.cmc-link').attr('href');
        topCoinList.push("https://coinmarketcap.com" + url);
    });
    return topCoinList;
}

module.exports.topCoinLinks = topCoinLinks;