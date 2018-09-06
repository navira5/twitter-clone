var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require('../database-mongo');
var twitter = require('./twitter')

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    console.log('data from db in server-->', data)
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});


app.post('/items', function (req, res) {
  var searchTerm = req.body.term;

  twitter.getTweets(searchTerm, function(err, response) {
    response.forEach(tweet => {
      date = tweet.createdAt;
      text = tweet.text;
      retweets = tweet.retweetsCount;
      user = tweet.username;
      screen = tweet.userscreen

      items.save(searchTerm, date, text, retweets, user, screen, function(err, response) {
        if (err) {
          res.send(500)
        } else {
          res.end()
      }
    })
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

