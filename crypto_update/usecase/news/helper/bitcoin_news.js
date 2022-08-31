const cheerio = require("cheerio");
const { News } = require("./../../../../domain/crypto_update.js");
const axios = require("axios");
const { bitcoinNewsError } = require("./../../../../domain/errors.js");

const bitcoinNews = async () => {
  try {
    const bitcoinNewsNavigation = await axios.get("https://news.bitcoin.com");
    const bitcoinNewsNavigationHtml = bitcoinNewsNavigation.data;
    const $ = cheerio.load(bitcoinNewsNavigationHtml);
    const news = new Set();
    $(".story--medium__info").each(function (i, elem) {
      var news_title = $(this).text().replace(/\n/g, "").trim();
      var news_url = $(this).find("a").attr("href");
      news.add(new News(news_title, news_url));
    });
    return news;
  } catch (error) {
    return bitcoinNewsError;
  }
};

module.exports.bitcoinNews = bitcoinNews;
