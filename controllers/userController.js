const User = require('../models/User');
const bcrypt = require('bcryptjs');

const login=(req,res)=>{
  res.render("login")
}
const Registration= (req,res)=>{
  res.render("register")
}


const RegistrationPost = (req, res) => {
  const { username, password } = req.body;
  let errors = [];

  // Console log to debug incoming form data
  console.log('Request Body:', req.body);

  // Check if all fields are provided
  if (!username || !password) {
    errors.push({ msg: "Please ensure all fields are filled" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  // Render errors if any
  if (errors.length > 0) {
    return res.render("register", { errors, username, password });
  }

  // Check if username already exists
  User.findOne({ username: username })
    .then(result => {
      if (result) {
        errors.push({ msg: "Username already exists" });
        return res.render("register", { errors, username, password });
      }

      // Encrypt password and save new user
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          req.flash('error_msg', "Could not encrypt the password");
          return res.redirect('/register');
        }

        const newUser = new User({ username, password: hash });
        newUser.save()
          .then(() => {
            console.log('New user saved successfully');
            req.flash('message', 'Registration Successful. You can now login');
            res.redirect('/login');
          })
          .catch(err => {
            console.error('Error saving new user to database:', err);
            req.flash('error_msg', "Could not save into the Database");
            res.redirect('/register');
          });
      });
    })
    .catch(err => {
      console.error('Error finding user in the database:', err);
      req.flash('error_msg', "Database error");
      res.redirect('/register');
    });
};


const LoginPost = (req, res) => {
  const { username, password } = req.body;

  // Console log to debug incoming form data
  console.log('Login Request Body:', req.body);

  User.findOne({ username: username })
    .then(result => {
      if (!result) {
        req.flash('error_msg', "This Username does not exist");
        return res.redirect('/login');
      } 

      bcrypt.compare(password, result.password, (err, isVerified) => {
        if (err) {
          console.error('Error comparing password:', err);
          req.flash('error_msg', "Something appears wrong: " + err);
          return res.redirect('/login');
        }

        if (isVerified) {
          // Establish SESSION variables
          req.session.user_id = result._id;
          req.session.username = result.username;

          // Redirect user to the dashboard page
          return res.redirect('/dashboard');
        } else {
          req.flash('error_msg', "Invalid Password");
          return res.redirect('/login');
        }
      });
    })
    .catch(err => {
      console.error('Database error:', err);
      req.flash('error_msg', "There was a problem selecting from DB");
      res.redirect('/login');
    });
};

module.exports=({login,Registration,RegistrationPost,LoginPost})
