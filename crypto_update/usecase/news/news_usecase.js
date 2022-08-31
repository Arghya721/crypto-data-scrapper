const { coindeskNews } = require("./helper/coindesk_news.js");
const { cryptoNews } = require("./helper/crypto_news.js");
const { bitcoinNews } = require("./helper/bitcoin_news.js");
const { newsUsecaseError } = require("./../../../domain/errors.js");

async function newsUsecase() {
  try {
    const coindeskData = await coindeskNews();
    if (coindeskData.code === "coindeskNewsError") {
      return coindeskData;
    }
    const cryptoData = await cryptoNews();
    if (cryptoData.code === "cryptoNewsError") {
      return cryptoData;
    }
    const bitcoinData = await bitcoinNews();
    if (bitcoinData.code === "bitcoinNewsError") {
      return bitcoinData;
    }
    const data = new Set([...coindeskData, ...cryptoData, ...bitcoinData]);
    const news = Array.from(data);
    return news;
  } catch (error) {
    return newsUsecaseError;
  }
}

module.exports.newsUsecase = newsUsecase;
