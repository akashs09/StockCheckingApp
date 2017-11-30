const stockData = require('./stock.js');

const stocks = process.argv.slice(2);

stocks.forEach(stock => {
    const ticker = stock.substring(0,stock.indexOf('-'));
    const id = stock.substring(stock.indexOf('-')+1);
    stockData.get(ticker,id);
});
