/**
 * Creates and exports express app.
 */

const express = require('express');
const app = express();

/**
 * Body Parsing middleware settings.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Global middleware for setting response headers.
 */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Set the default view engine for express app
 */
app.set('view engine', 'pug');

/**
 * Set default views directory on express application
 */
app.set('views', './src/views');

/**
 * Loading the application source code defined in src.
 */
require('./src')(app);


/**
 * Global middleware to catch 404 errors.
 */
app.use(function (req, res, next) {
  res.status(404).send('Page not found');
});

/**
 * Global middleware to handle errors.
 */
app.use(function (err, req, res, next) {
  res.status(500).send(`An error occured. ${err.toString()}`);
});

module.exports = app;