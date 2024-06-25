const express = require('express');
const router = express.Router();
const {createOrder} = require('../controllers/orderController');

router.post('/orders', createOrder);

router.get('/orders', (req, res) => {
  res.render('orderForm');
});

module.exports = router;
