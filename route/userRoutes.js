const express = require('express');
const router = express.Router();
const {login,RegistrationPost,LoginPost} = require('../controllers/userController');

router.get('/login',login);
router.get('/register', (req, res) => {
    res.render('register', { errors: [], username: '', password: '' });
  });
router.post('/register',RegistrationPost);
router.post('/login',LoginPost);
router.get('/dashboard', (req, res) => {
  if (!req.session.user_id) {
    req.flash('error_msg', 'You must be logged in to view this page');
    return res.redirect('/login');
  }

  res.render('dashboard', { username: req.session.username });
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect('/dashboard');
    }
    res.redirect('/login');
  });
});
module.exports = router;
