const superagent = require("superagent");

const cheerio = require("cheerio");

// import News from domain
const { News } = require("./../../../../domain/crypto_update.js");

const { coinDeskNewsError } = require("./../../../../domain/errors.js");

const coindeskNews = async () => {
  try {
    const coinDeskNavigation = await superagent.get(
      "https://www.coindesk.com/markets/"
    );
    const coinDeskNavigationHtml = coinDeskNavigation.text;
    const news = new Set();

    const $ = cheerio.load(coinDeskNavigationHtml);

    // get news from the navigation
    $(".side-cover-cardstyles__SideCoverCardData-sc-1nd3s5z-2.gnuOAQ").each(
      (i, element) => {
        const newsText = $(element).text();
        const newslink =
          "https://www.coindesk.com" + $(element).find("a").attr("href");
        news.add(new News(newsText, newslink));
      }
    );

    return news;
  } catch (error) {
    return coinDeskNewsError;
  }
};

module.exports.coindeskNews = coindeskNews;
