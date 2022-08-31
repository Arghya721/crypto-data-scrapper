const cheerio = require("cheerio");
const axios = require("axios");

// import News from domain
const { News } = require("./../../../../domain/crypto_update.js");
const { cryptoNewsError } = require("./../../../../domain/errors.js");

const cryptoNews = async () => {
  try {
    const cryptoNewsNavigation = await axios.get(
      "https://rapi.cryptonews.com/api/tagdata/crypto-2022/1"
    );

    var html = JSON.stringify(cryptoNewsNavigation.data.items).replace(
      /\\/g,
      ""
    );

    const $ = cheerio.load(html);
    const list = [];

    // get news from the html
    $(".mb-30").each(function (i, elem) {
      var news_title = $(this).find("h4").text();
      var news_url = "https://cryptonews.com".concat(
        $(this).find("a").attr("href")
      );
      list.push(new News(news_title, news_url));
    });

    return list;
  } catch (error) {
    return cryptoNewsError;
  }
};

module.exports.cryptoNews = cryptoNews;
