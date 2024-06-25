// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');

// Import routes
const designRoutes = require('./route/designRoutes');
const orderRoutes = require('./route/orderRoutes');
const homeRoutes = require('./route/homeRoutes');
const userRoutes = require('./route/userRoutes');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/illustrator').then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.message = req.flash('message');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Import route files
app.use('/', designRoutes);
app.use('/', homeRoutes);
app.use('/', orderRoutes);
app.use('/', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
