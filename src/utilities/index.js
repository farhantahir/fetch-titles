const utilities = {};

[
  'isURL',
  'prepareURL'
].forEach(m => {
  utilities[m] = require(`./${m}`);
});

module.exports = utilities;