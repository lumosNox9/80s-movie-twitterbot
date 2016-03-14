var Twit = require('twit');
var http = require('http');
var twitInfo = require('./config.js');
var quotesJSON = require('./quotes.js');
var twitter = new Twit(twitInfo);
var quotesArr = [];
var quote;

var getQuotes = function () {
  console.log('getQuotes');
  var tempArr = quotesJSON();
  for(var i = 0; i < tempArr.length; i++) {
    quotesArr.push(tempArr[i]);
  }
  if(tempArr.length == quotesArr.length) {
    tempArr = null;
  }
};

var chooseQuote = function() {
  console.log('chooseQuote');
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
