const express = require('express');
const router = express.Router();
const {landingPage,upload,createDesign,getDesigns} = require('../controllers/designController');


// Route for rendering the addDesign form
router.get('/add', getDesigns); // Make sure addDesign.ejs exists in your views directory

// Route for handling form submission to create a new design
router.post('/add',upload, createDesign);

// Route for displaying all designs
router.get('/', landingPage);

module.exports = router;
