/**
 * Routes file for Fetch Title Request
 */

const express = require('express');
const router = express.Router();

const FetchTitles = require('../controllers/fetchTitles');

module.exports = () => {
 const PATH = '';
 router.get('/callbacks/I/want/title', FetchTitles.fetchTitlesWithCallbacks);
 router.get('/async-lib/I/want/title', FetchTitles.fetchTitlesWithAsyncLib);
 router.get('/promises/I/want/title', FetchTitles.fetchTitlesWithPromises);
 
 return {
   PATH,
   router
 }
};