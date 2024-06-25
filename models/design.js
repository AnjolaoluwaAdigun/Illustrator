const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designSchema = new Schema({
  title: String,
  colors: [String],
  fabricMaterial: String,
  dressType: String,
  personality: [String],
  other: String,
  price: Number,
  images:[String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Design', designSchema);
