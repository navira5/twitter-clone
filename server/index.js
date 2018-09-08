var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var twitter = require('../utility/twitter');
var facebook = require('../utility/facebook');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/items', (req, res) => {
  items.selectAll(function(err, data) {
    console.log('data from db to server-->', data)
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});


app.post('/items', (req, res) => {
  const searchTerm = req.body.term;
//   twitter.getTweets(searchTerm, function(err, response) {
//     response.forEach(tweet => {
//       date = tweet.createdAt;
//       text = tweet.text;
//       retweets = tweet.retweetsCount;
//       user = tweet.username;
//       screen = tweet.userscreen

//       items.save(searchTerm, date, text, retweets, user, screen, function(err, response) {
//         if (err) {
//           res.send(500)
//         } else {
//           res.end()
//       }
//     })
//   })
// });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

