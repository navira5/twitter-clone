const config = require('../config');
const request = require("request");

const getTweets = (searchTerm, callback ) => {
    const search_auth = {
        consumer_key: config.APIKEY,
        consumer_secret: config.APISECRET//,
      
      }
      
    let request_options = {
      url: 'https://api.twitter.com/1.1/tweets/search/30day/dev.json',
    
      oauth: search_auth,
      json: true,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        "query": searchTerm
      }
    }
      
    request.post(request_options, function (error, response, body) {
    
      if (error) {
        console.log('Error making search request.', error)
        return;
      } else {
        let final = body.results.reduce((results, tweet) => {
          var obj = {
            createdAt: tweet.created_at,
            text: tweet.text,
            retweetsCount: tweet.retweet_count,
            favoriteCount: tweet.favorite_count,
            username: tweet.user.name,
            userscreen: tweet.user.screen_name
          }
          results.push(obj);
          return results;
        }, [])

        callback(final)
      }
    })
};


module.exports.getTweets = getTweets;
