var Twit = require('twit');
var http = require('http');
var Promise = require("bluebird");
var twitInfo = require('./config.js');
var quotesJSON = require('./quotes.js');
var twitter = new Twit(twitInfo);
var quotesArr = [];

// var getQuotes = function () {
//   http.get('./quotes.json/', function(response) {
//     response.setEncoding('utf-8');
//     console.log('response: ' + response);
//     response.on('data', function(data) {
//       quotesArr.push(data);
//     })
//     response.on('error', function(error) {
//       console.log('error! ' + error);
//     })
//   });
// };

var getQuotes = function () {
  var tempArr = quotesJSON();
  for(var i = 0; i < tempArr.length; i++) {
    quotesArr.push(tempArr[i]);
  }
  if(tempArr.length == quotesArr.length) {
    tempArr = null;
  }
};

var chooseQuote = function() {
  var tempQuote;
  if(quotesArr <= 0) {
    console.log("Quotes array is less than zero!");
    return;
  }
  tempQuote = quotesArr[Math.floor(Math.random() * quotesArr.length)];
  console.log('tempQuote == ' + tempQuote);
  return tempQuote;
}

var postToTwitter = function () {
  twitter.post('statuses/update', { status: quote }, function(err, data, response) {
    console.log(data);
  });
};

getQuotes();
var quote = chooseQuote();
postToTwitter();
