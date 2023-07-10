const { coinDetails } = require("./helper/coin_details");

async function coinDetailsUsecase(coinName) {
    const coinInfo = await coinDetails(coinName);
    return coinInfo;
}

module.exports.coinDetailsUsecase = coinDetailsUsecase;