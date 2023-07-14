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
const {
  coinDetailsUsecase,
} = require("./crypto_update/usecase/coin_details/coin_details_usecase");
const serverless = require("serverless-http");
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const app = express();

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to Crypto Scrapper API",
  });
});


/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get news
 *     description: Retrieve news articles
 *     responses:
 *       200:
 *         description: A list of news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get("/news", async (req, res) => {
  const news = await newsUsecase();
  if (news.code != undefined) {
    return res.status(500).json(news);
  }
  res.json(news);
});

/**
 * @swagger
 * /coin-list:
 *   get:
 *     summary: Get coin list
 *     description: Retrieve a list of coins
 *     responses:
 *       200:
 *         description: A list of coins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get("/coin-list", async (req, res) => {
  const coinList = await coinListUsecase();
  if (coinList.code != undefined) {
    return res.status(500).json(coinList);
  }
  res.json(coinList);
});

/**
 * @swagger
 * /top-losers-gainers:
 *   get:
 *     summary: Get top losers and gainers
 *     description: Retrieve a list of top losers and gainers
 *     responses:
 *       200:
 *         description: Object containing top gainers and top losers
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GainerLoser'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get("/top-losers-gainers", async (req, res) => {
  const topLosersGainers = await topLosersGainersUsecase();
  if (topLosersGainers.code != undefined) {
    return res.status(500).json(topLosersGainers);
  }
  res.json(topLosersGainers);
});

/**
 * @swagger
 * /currency/{coin}:
 *   get:
 *     summary: Get coin details
 *     description: Retrieve details of a specific coin
 *     parameters:
 *       - in: path
 *         name: coin
 *         required: true
 *         description: Name of the coin
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coin details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoinDetails'
 *       404:
 *         description: Coin not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get("/currency/:coin", async (req, res) => {
  const coinName = req.params.coin;
  const coinDetails = await coinDetailsUsecase(coinName);
  
  if (coinDetails.code !== undefined) {
    return res.status(404).json(coinDetails);
  }
  res.json(coinDetails);
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports.handler = serverless(app);