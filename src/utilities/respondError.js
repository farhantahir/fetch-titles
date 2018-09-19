/**
 * Responds with error view
 * @param {*} res 
 * @param {*} message 
 * @param {*} status 
 */
module.exports = function(res, error, status = 500) {
  res.status(status)
    .render('error', { message: `An error occured. ${error.toString()}` });
}