const axios = require("axios");
const cheerio = require("cheerio");
const {
  TopLosers,
  Topgainers,
  GainerLoser,
} = require("./../../../../domain/crypto_update.js");
const { topGainersLosersError } = require("./../../../../domain/errors.js");

const topGainersLosers = async () => {
  try{
  const URL = "https://coinmarketcap.com/gainers-losers/";
  const topGainersLosersNavigation = await axios.get(URL);
  const topGainersLosersNavigationHtml = topGainersLosersNavigation.data;
  const $ = cheerio.load(topGainersLosersNavigationHtml);
  var top_gainers = [];
  var top_losers = [];
  const gainers_losers = $(".uikit-col-md-8.uikit-col-sm-16");
  $(gainers_losers[0])
    .find("tr")
    .each(function (i, elem) {
      var rank = $(this).find("td:nth-child(1)").text();
      var coin = $(this).find("td:nth-child(2)").find("p:nth-child(1)").text();
      var symbol = $(this)
        .find("td:nth-child(2)")
        .find("p:nth-child(2)")
        .text();
      var price = $(this).find("td:nth-child(3)").text();
      var change_24hr = $(this).find("td:nth-child(4)").text();
      var volume_24hr = $(this).find("td:nth-child(5)").text();
      coin = coin.replace(" ", "-").replace(".", "-");
      const gainers = new Topgainers(
        rank,
        coin,
        symbol,
        price,
        change_24hr,
        volume_24hr
      );
      if (coin !== "") {
        top_gainers.push(gainers);
      }
    });

  $(gainers_losers[1])
    .find("tr")
    .each(function (i, elem) {
      var rank = $(this).find("td:nth-child(1)").text();
      var coin = $(this).find("td:nth-child(2)").find("p:nth-child(1)").text();
      var symbol = $(this)
        .find("td:nth-child(2)")
        .find("p:nth-child(2)")
        .text();
      var price = $(this).find("td:nth-child(3)").text();
      var change_24hr = $(this).find("td:nth-child(4)").text();
      var volume_24hr = $(this).find("td:nth-child(5)").text();
      coin = coin.replace(" ", "-").replace(".", "-");
      const losers = new TopLosers(
        rank,
        coin,
        symbol,
        price,
        change_24hr,
        volume_24hr
      );
      if (coin !== "") {
        top_losers.push(losers);
      }
    });
  const top_gainers_losers = new GainerLoser(top_gainers, top_losers);
  return top_gainers_losers;
  }
  catch(error){
    return topGainersLosersError;
  }
};

module.exports.topGainersLosers = topGainersLosers;
