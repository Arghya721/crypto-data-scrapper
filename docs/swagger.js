const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Crypto API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        News: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
            },
            link: {
              type: 'string',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            code: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
          },
        },
        TopGainers: {
          type: 'object',
          properties: {
            rank: {
              type: 'number',
            },
            coin: {
              type: 'string',
            },
            symbol: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            rise_24hr: {
              type: 'number',
            },
            volume_24hr: {
              type: 'number',
            },
          },
        },
        TopLosers: {
          type: 'object',
          properties: {
            rank: {
              type: 'number',
            },
            coin: {
              type: 'string',
            },
            symbol: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            drop_24hr: {
              type: 'number',
            },
            volume_24hr: {
              type: 'number',
            },
          },
        },
        GainerLoser: {
          type: 'object',
          properties: {
            top_gainers: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/TopGainers',
              },
            },
            top_losers: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/TopLosers',
              },
            },
          },
        },
        CoinDetails: {
          type: 'object',
          properties: {
            coin: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            rank: {
              type: 'number',
            },
            symbol: {
              type: 'string',
            },
            image: {
              type: 'string',
            },
            link: {
              type: 'string',
            },
            marketCap: {
              type: 'number',
            },
            volume24hr: {
              type: 'number',
            },
            circulatingSupply: {
              type: 'number',
            },
            maxSupply: {
              type: 'number',
            },
          },
        },
      },
    },
  },
  apis: ['./handler.js'], // Path to the API routes files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
