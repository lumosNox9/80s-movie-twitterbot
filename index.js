var Twit = require('twit');
var http = require('http');
require('dotenv').config();
var quotesJSON = require('./quotes.js');
var quotesArr = [];
var quote;
var twitInfo = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
};
var twitter = new Twit(twitInfo);

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
  return tempQuote;
}

var postToTwitter = function () {
  twitter.post('statuses/update', { status: quote }, function(err, data, response) {
    console.log(data);
  });
};

var pickTheQuote = new Promise(function(resolve, reject) {
  getQuotes();
  if(quotesArr <= 0) {
    reject(pickTheQuote);
    return;
  } else {
    resolve(pickTheQuote);
  }
});

pickTheQuote.then(
  function() {
    quote = chooseQuote();
  }
)
.then(
  function() {
    postToTwitter();
  }
)
.catch(
  function(err) {
    console.log('Error: ' + err);
  }
);
