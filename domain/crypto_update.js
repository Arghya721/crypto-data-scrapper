class Topgainers {
    constructor(rank, coin, symbol, price, rise_24hr, volume_24hr) {
        this.rank = rank;
        this.coin = coin;
        this.symbol = symbol;
        this.price = price;
        this.rise_24hr = rise_24hr;
        this.volume_24hr = volume_24hr;
    }
}

class TopLosers {
    constructor(rank, coin, symbol, price, drop_24hr, volume_24hr) {
        this.rank = rank;
        this.coin = coin;
        this.symbol = symbol;
        this.price = price;
        this.drop_24hr = drop_24hr;
        this.volume_24hr = volume_24hr;
    }
}

class GainerLoser {
    constructor(top_gainers, top_losers) {
        this.top_gainers = top_gainers;
        this.top_losers = top_losers;
    }
}



class News {
    constructor(title, link) {
        this.title = title;
        this.link = link;
    }
}

class CoinDetails {
    constructor(coin,price , rank, symbol,image,link,marketCap,fullyDilutedMarketCap,volume24hr,volumebyMarketCap,circulatingSupply,highLow24hr,maxSupply,totalSupply) {
        this.coin = coin;
        this.price = price;
        this.rank = rank;
        this.symbol = symbol;
        this.image = image;
        this.link = link;
        this.marketCap = marketCap;
        this.fullyDilutedMarketCap = fullyDilutedMarketCap;
        this.volume24hr = volume24hr;
        this.volumebyMarketCap = volumebyMarketCap;
        this.circulatingSupply = circulatingSupply;
        this.highLow24hr = highLow24hr;
        this.maxSupply = maxSupply;
        this.totalSupply = totalSupply;
    }
}

module.exports = {
    Topgainers,
    TopLosers,
    GainerLoser,
    News,
    CoinDetails
}