const express = require('express');
const router = express.Router();
const {landingPage}= require('../controllers/designController');

router.get('/',landingPage);

module.exports = router;
