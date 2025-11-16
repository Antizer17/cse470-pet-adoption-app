const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const daycarePackageSchema = new Schema({
  // The name of the package, e.g., 'Half Day'
  name: {
    type: String,
    required: true,
    unique: true
  },
  // Brief description of the package's features
  description: {
    type: String,
    required: true
  },
  // Price per day/session (stored as a number)
  price: {
    type: Number,
    required: true
  },
  // Duration or inclusions, e.g., '4 hours' or '1 week'
  duration: {
    type: String,
    required: true
  },
  // An array of strings for bullet points on the frontend
  features: {
    type: [String],
    required: true
  }
}, { timestamps: true }); 

// This line exports the model, which is what 'DaycarePackage.find' needs
module.exports = mongoose.model('DaycarePackage', daycarePackageSchema);