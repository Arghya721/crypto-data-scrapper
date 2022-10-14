const axios = require("axios");
const cheerio = require("cheerio");
const { cryptoListError } = require("./../../../../domain/errors.js");

const cryptoList = async () => {
  try {
    const top50CoinURL = "https://crypto.com/price?page=1";
    const next50CoinURL = "https://crypto.com/price?page=2";
    var top_names = [];
    const top100Coin = await axios.all([
      axios.get(top50CoinURL),
      axios.get(next50CoinURL),
    ]);
    top100Coin.forEach((response) => {
      const $ = cheerio.load(response.data);
      $(".chakra-text.css-rkws3").each(function (i, elem) {
        var coin = $(this).text();
        coin = coin.replace(" ", "-");
        coin = coin.replace(".", "-");
        top_names.push(coin);
      });
    });
    return top_names;
  } catch (error) {
    return cryptoListError;
  }
};

module.exports.cryptoList = cryptoList;
