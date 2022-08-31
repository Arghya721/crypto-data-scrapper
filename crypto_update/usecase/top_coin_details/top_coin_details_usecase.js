const {topCoinDetails} = require("./helper/top_coin_details");

async function topCoinDetailsUsecase() {
    const top100CoinDetails = await topCoinDetails();
    return top100CoinDetails;
}

module.exports.topCoinDetailsUsecase = topCoinDetailsUsecase;