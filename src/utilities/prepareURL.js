/**
 * Makes sure to have http:// in url
 * @param {string} url 
 */
module.exports = function (url) {
  const http = 'http://';
  const https = 'https://';
  if (url.startsWith(http) || url.startsWith(http)) return url;
  return `${http}${url}`;
}