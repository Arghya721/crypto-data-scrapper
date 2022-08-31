const  {topGainersLosers} = require("./helper/gainer_loser_helper");
const {topGainersLosersError} = require("./../../../domain/errors");

async function topLosersGainersUsecase() {
  try{
  const gainersLosers = await topGainersLosers();
  return gainersLosers;
  }
  catch(error){
    return topGainersLosersError;
  }
}

module.exports.topLosersGainersUsecase = topLosersGainersUsecase;
