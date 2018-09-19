const request = require('request');
const cheerio = require('cheerio');
const async = require('async');

const utils = require('../utilities');

const asyncLibIteratee = function (addr, cb) {
  const url = utils.prepareURL(addr);
  request(url, function (err, resp, body) {
    let titleObj = {};
    if (err) {          
      titleObj = { address: addr, title: null };
    } else {
      const $ = cheerio.load(body);          
      titleObj = { address: addr, title: $('title').text() || null };
    }
    cb(null, titleObj);
  });
}

module.exports = {

  /**
   * Fetch Site Titles Request handler using callbacks approach
   */
  fetchTitlesWithCallbacks: function (req, res) {
    
    const addresses = req.query.address || [];
    const siteTitles = [];
    if (!addresses.length) res.send('No address found!');
    
    let processedAddrs = 0;

    for(let addr of addresses) {
      const url = utils.prepareURL(addr);
      request(url, function (err, resp, body) {
        if (err) {          
          siteTitles.push({ address: addr, title: null });
        } else {
          const $ = cheerio.load(body);          
          siteTitles.push({ address: addr, title: $('title').text() || null });
        }

        processedAddrs++;
        if (processedAddrs === addresses.length)
          res.render('list_titles', { siteTitles });
      });
    }    
  },

  /**
   * Fetch Titles request handler using async library
   */
  fetchTitlesWithAsyncLib: function (req, res) {
    const addresses = req.query.address || [];    
    if (!addresses.length) res.send('No address found!');
    async.map(addresses, asyncLibIteratee, function(err, siteTitles) {
      res.render('list_titles', { siteTitles });
    });
  }
};