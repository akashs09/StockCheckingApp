const https = require('https');
const http = require('http');


function get(ticker,id){
  try {
    id = id.replace('_',' ');
    const request = https.get(`https://www.quandl.com/api/v1/datasets/WIKI/${ticker}.json`, response => {
      if (response.statusCode === 200) {

        let body = '';
        //reading data stream
        response.on('data', chunk => {
          body += chunk;
        })

        response.on('end', () => {
          try {
            const stockPrice = JSON.parse(body);
            let idIndex;
            let suffix;
            //fetch the user inputted value on the column_names and the word associated with it
             (stockPrice.column_names).forEach(function (currentValue, index, array) {
              if (id === currentValue) {
                idIndex = index
                suffix = currentValue;
              }
            });
            // console.log(idIndex);
            const data = (stockPrice.data[0][idIndex]);
            printMsg(ticker, data, suffix);
        } catch(e) {
          printErrorMsg(e);
        }
        })
      } //end of statsuCode conditional
      else {
        const message = `There was an error retrieving ${id} data for ${ticker} because of (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printErrorMsg(statusCodeError);
      }

  }) //end of request get
} //end of try block
  catch (e) {
    printErrorMsg(e) //malformed url error
  }
}//end of getPrice function


function printMsg(ticker, data, suffix){
  let msg;
  suffix = suffix.toLowerCase();

  if (suffix !== 'volume')
  {
   msg = `${ticker} had a(n) ${suffix} of $${data} `;
}
else {
  data = data.toLocaleString('en');
   msg = `${ticker} did ${data} shares today`;
}
console.log(msg);
}
function printErrorMsg(error){
  console.error(error.message);
}


module.exports.get = get;
