require('dotenv').config();
const { newsUsecase } = require("./crypto_update/usecase/news/news_usecase");
const {
  coinListUsecase,
} = require("./crypto_update/usecase/coin_list/coin_list_usecase");
const {
  topLosersGainersUsecase,
} = require("./crypto_update/usecase/top_losers_gainers/top_losers_gainers_usecase");
const {
  topCoinDetailsUsecase,
} = require("./crypto_update/usecase/top_coin_details/top_coin_details_usecase");
const serverless = require("serverless-http");
const express = require("express");
const app = express();
const axios = require("axios");


app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to Crypto Scrapper API",
  });
});

app.get("/news", async (req, res) => {
  const news = await newsUsecase();
  if (news.code != undefined) {
    res.status(500).json(news);
  }
  res.json(news);
});

app.get("/coin-list", async (req, res) => {
  const coinList = await coinListUsecase();
  if (coinList.code != undefined) {
    res.status(500).json(coinList);
  }
  res.json(coinList);
});

app.get("/top-losers-gainers", async (req, res) => {
  const topLosersGainers = await topLosersGainersUsecase();
  if (topLosersGainers.code != undefined) {
    res.status(500).json(topLosersGainers);
  }
  res.json(topLosersGainers);
});

app.get("/top-coin-details", async (req, res) => {
  const topCoinDetails = await axios.get(
    `${process.env.CRYPTO_API_URL}`
  );
  res.json(topCoinDetails.data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports.handler = serverless(app);
