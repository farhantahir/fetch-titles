const request = require('request');
const cheerio = require('cheerio');

const utils = require('../utilities');


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
  }

};