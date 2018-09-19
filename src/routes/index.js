/**
 * Main file for all routes
 */

module.exports = (app) => {
  /**
   * Array of Routes' file names to load routes in application
   */
  [
    
  ]
    .forEach(r => {
      const { PATH, router } = require(`./${r}`)();      
      app.use(`${PATH}`, router);
    });
};