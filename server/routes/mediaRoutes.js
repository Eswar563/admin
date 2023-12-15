
const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/media.js');

router.get('/media', instagramController.fetchAndSaveInstagramMedia);

module.exports = router;
