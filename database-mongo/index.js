var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  searchTerm: String,
  createdAt: String,
  text: String,
  retweetcount: Number,
  favoritecount: Number,
  username: String,
  screen: String
});

var Item = mongoose.model('Item', itemSchema);

var selectAll = function(callback) {
  Item.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var save = function(term, date, tweet,retweet,favorite,name,screen, callback) {
  let newTerm = new Item({
    searchTerm: term,
    createdAt: date,
    text: tweet,
    retweetcount: retweet,
    favoritecount: favorite,
    username: name,
    screen: screen})
  return newTerm.save(callback)
};

module.exports.selectAll = selectAll;
module.exports.save = save;