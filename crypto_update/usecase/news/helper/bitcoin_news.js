const cheerio = require("cheerio");
const { News } = require("./../../../../domain/crypto_update.js");
const axios = require("axios");
const { bitcoinNewsError } = require("./../../../../domain/errors.js");

const bitcoinNews = async () => {
  try {
    const bitcoinNewsNavigation = await axios.get("https://api.news.bitcoin.com/wp-json/bcn/v1/posts?offset=0&per_page=20&exclude=278,341,177113");
    const bitcoinNewsJSONData = bitcoinNewsNavigation.data;
    const news = new Set();
    bitcoinNewsJSONData?.posts.forEach((element) => {
      const newsObject = new News(
        element.title, 
        "https://news.bitcoin.com/" + element.slug,
      )
      news.add(newsObject);
    });
    return news;
  } catch (error) {
    return bitcoinNewsError;
  }
};

module.exports.bitcoinNews = bitcoinNews;
