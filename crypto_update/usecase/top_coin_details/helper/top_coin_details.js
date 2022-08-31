const axios = require("axios");
const cheerio = require("cheerio");
const { topCoinLinks } = require("./top_coin_links");
const { CoinDetails } = require("./../../../../domain/crypto_update.js");

const topCoinDetails = async () => {
  const topCoinList = await topCoinLinks();
  const topCoinDetails = [];
  for (let i = 0; i < topCoinList.length; i++) {
    const coinNavigation = await axios.get(topCoinList[i]);
    const $ = cheerio.load(coinNavigation.data);
    const symbol = $(".nameSymbol").text();
    var coinDetail = $(".nameSymbol").remove();
    var coin = $(".sc-1q9q90x-0.jCInrl.h1").text();
    var rank = $(".namePillPrimary").text();
    rank = rank.slice(5, rank.length);
    const price = $(".priceValue").text();

    const highlow24hr = $(".n78udj-5.dBJPYV").text().split("$");
    const image = $(".sc-16r8icm-0.gpRPnR.nameHeader").find("img").attr("src");
    const link = $(".link-button").attr("href");
    const low = "$" + highlow24hr[1];
    const high = "$" + highlow24hr[2];
    const maxsupply = [];
    $(".maxSupplyValue").each((i, el) => {
      var supply = $(el).text();
      maxsupply.push(supply);
    });

    const list = [];
    $(".statsValue").each(function (i, elem) {
      const stats = $(this).text();
      list.push(stats);
    });
    const marketcap = list[0];
    const fullydilutedmc = list[1];
    const volume = list[2];
    const volumemc = list[3];
    const circulating = list[4];
    const highLow24hr = {
      high: high,
      low: low,
    };
    const coinDetails = new CoinDetails(
      coin,
      price,
      rank,
      symbol,
      image,
      link,
      marketcap,
      fullydilutedmc,
      volume,
      volumemc,
      circulating,
      highLow24hr,
      maxsupply[0],
      maxsupply[1]
    );
    topCoinDetails.push(coinDetails);
  }
  return topCoinDetails;
};

module.exports.topCoinDetails = topCoinDetails;
