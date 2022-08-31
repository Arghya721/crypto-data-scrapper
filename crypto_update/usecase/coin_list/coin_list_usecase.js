const {cryptoList} = require('./helper/cryptoList');
const {cryptoListError} = require('./../../../domain/errors');


async function coinListUsecase() {
    try {
    const list = await cryptoList();
    return list;
    }
    catch(error) {
        return cryptoListError;
    }
}

module.exports.coinListUsecase = coinListUsecase;