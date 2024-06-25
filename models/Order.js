const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerName: String,
  email: String,
  colors: [String],
  fabricMaterial: String,
  dressType: String,
  personality: [String],
  other: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
