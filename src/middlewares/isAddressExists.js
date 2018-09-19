const utils = require('../utilities');

/**
 * Middleware to validate if address exists on query params
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = function (req, res, next) {
  const addresses = req.query.address || [];    
  if (!addresses.length) return utils.respondError(res, 'No Address found!', 400);
  next();
}