const request = require('request');
const cheerio = require('cheerio');
const async = require('async');
const requestPromise = require('request-promise-native');
const RxJs = require('rxjs');

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
};

const requestTitlesWithPromises = function (addresses) {
  return addresses.map(addr => {
    const url = utils.prepareURL(addr);
    return requestPromise(url)
      .then(body => {
        const $ = cheerio.load(body);
        return { address: addr, title: $('title').text() || null };
      })
      .catch(err => {
        console.log(err, 'err');
        Promise.resolve({ address: addr, title: null });
      });
  });
};

module.exports = {

  /**
   * Fetch Site Titles Request handler using callbacks approach
   */
  fetchTitlesWithCallbacks: function (req, res) {
    
    const addresses = req.query.address || [];
    const siteTitles = [];    
    
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
    async.map(addresses, asyncLibIteratee, function(err, siteTitles) {
      res.render('list_titles', { siteTitles });
    });
  },

  fetchTitlesWithPromises: function (req, res) {
    const addresses = req.query.address || [];        
    const addressRequests = requestTitlesWithPromises(addresses);

    Promise.all(addressRequests)
      .then(siteTitles => {
        res.render('list_titles', { siteTitles });
      })
      .catch(err => utils.respondError(res, `An error occured: ${err.toString()}`));
  },

  /**
   * Fetch titles request handler using RXJS
   */
  fetchTitlesWithRXJS: function (req, res) {
    const addresses = req.query.address || [];        
    const addressRequests = requestTitlesWithPromises(addresses);
    const observeableSource = RxJs.forkJoin(...addressRequests);
    observeableSource.subscribe(
      siteTitles => res.render('list_titles', { siteTitles }),
      err => utils.respondError(res, `An error occured: ${err.toString()}`)
    );
  }
};