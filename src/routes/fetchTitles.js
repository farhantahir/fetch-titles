/**
 * Routes file for Fetch Title Request
 */

const express = require('express');
const router = express.Router();

const FetchTitles = require('../controllers/fetchTitles');
const isAddressExists = require('../middlewares/isAddressExists');

module.exports = () => {
 const PATH = '';
 router.get('/callbacks/I/want/title', isAddressExists, FetchTitles.fetchTitlesWithCallbacks);
 router.get('/async-lib/I/want/title', isAddressExists, FetchTitles.fetchTitlesWithAsyncLib);
 router.get('/promises/I/want/title', isAddressExists, FetchTitles.fetchTitlesWithPromises);
 
 return {
   PATH,
   router
 }
};