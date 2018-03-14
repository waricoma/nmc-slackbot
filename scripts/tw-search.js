'use strict';

const client = require('cheerio-httpcli');
let   twSearchLoop       = null;
let   tweetUrlsArray     = [];
let   tweetUrlsArrayNote = [];

module.exports = (robot) => { robot.hear(/NMCBOT_TW_SEARCH>/i, (msg) => {
  if( twSearchLoop != null ) clearInterval( twSearchLoop );
  twSearchLoop = setInterval(function() {
    client.fetch('https://twitter.com/search?f=tweets&vertical=default&q=%23n_movie_creator&src=typd', function (err, $, res) {
      $('.tweet-timestamp.js-permalink.js-nav.js-tooltip').each(function () {
        tweetUrlsArray.push( $(this).prop('href') );
      });
      tweetUrlsArray.forEach(function( value, index ) {
        if(tweetUrlsArrayNote.indexOf(value) == -1) {
          msg.send( `https://twitter.com${value}` );
          tweetUrlsArrayNote.push(value);
        }
      });
      tweetUrlsArray = [];
    });
  }, 3000);
}); }
