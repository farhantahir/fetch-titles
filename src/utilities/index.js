const utilities = {};

[
  'isURL',
  'prepareURL',
  'respondError'
].forEach(m => {
  utilities[m] = require(`./${m}`);
});

module.exports = utilities;