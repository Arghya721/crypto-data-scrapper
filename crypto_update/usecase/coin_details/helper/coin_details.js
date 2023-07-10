const superagent = require("superagent");
const axios = require("axios");
const cheerio = require("cheerio");
const { coinNotFoundError } = require("./../../../../domain/errors.js");

const { CoinDetails } = require("./../../../../domain/crypto_update.js");

const coinDetails = async (coinName) => {
  try {
    var coinNavigation = await superagent.get(
      "https://crypto.com/price/" + coinName
    );
  } catch (error) {
    return coinNotFoundError;
  }

  const coinNavigationHtml = coinNavigation.text;

  const $ = cheerio.load(coinNavigationHtml);

  let coin = $(".chakra-heading.css-spkkpi").text().trim();
  let price = $(".chakra-text.css-13hqrwd").text().trim();
  let rank = $('[data-testid="rank"]').text().trim();
  let symbol = $(".chakra-heading.css-1wn0b4m").text().trim();
  let image = $("div.css-sxn26s img").attr("srcset");
  let link = $('a[data-testid="websiteLinksBtn"]').attr("href");

  console.log(image);

  const details = [];

  $(".chakra-text.css-1c8c51m").each((index, element) => {
    const detail = $(element).text().trim();
    details.push(detail);
  });

  const [marketcap, volume24hr, circulatingSupply, maxSupply] = details;

  const coinDetails = new CoinDetails(
    coin,
    price,
    rank,
    symbol,
    image,
    link,
    marketcap,
    volume24hr,
    circulatingSupply,
    // highLow24hr,
    maxSupply
  );

  return coinDetails;
};

module.exports.coinDetails = coinDetails;
