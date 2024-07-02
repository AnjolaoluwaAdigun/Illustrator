const Design = require('../models/design');
const express = require('express');
const router = express.Router();




const landingPage = async (req, res) => {
  try {
    const designs = await Design.find({});
    res.render('home', { designs: designs });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getDesigns=(req,res)=>{
  res.render("addDesign")
}


// Handle the creation of a new design
const createDesign = async (req, res) => {
  console.log('Starting file upload...');
  // upload(req, res, async (err) => {
  //   if (err) {
  //     console.error('Error uploading files:', err);
  //     req.flash('error_msg', `Error uploading files: ${err.message}`);
  //     return res.redirect('/add'); // Redirect back to the form on error
  //   }

    console.log('Files uploaded successfully');
    const { title, colors, fabricMaterial, personality, other, price } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
      const newDesign = new Design({ title, colors, fabricMaterial, personality, other, price, images });
      await newDesign.save();
      req.flash('message', 'Design created successfully');
      res.redirect('/'); // Redirect to the home page or dashboard
    } catch (err) {
      console.error('Error saving design:', err);
      req.flash('error_msg', 'Failed to create design');
      res.redirect('/add'); // Redirect back to the form on error
    }
  // });
};


module.exports=({landingPage,createDesign,getDesigns});
