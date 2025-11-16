// X:\cse4T70-pet-adoption-app\server\controllers\daycarePackageController.js

// This is the FINAL, REAL code that talks to the database.
const DaycarePackage = require('../models/DaycarePackageModel');
const mongoose = require('mongoose');

// @desc    GET all daycare packages
// @route   GET /api/daycare
// @access  Public
const getDaycarePackages = async (req, res) => {
  try {
    // Find all documents in the 'daycarepackages' collection
    const packages = await DaycarePackage.find({}).sort({ createdAt: 1 });

    // Respond with the packages and a 200 OK status
    res.status(200).json(packages);
  } catch (error) {
    // Handle any errors during the database query
    res.status(400).json({ error: error.message });
  }
};

// @desc    POST a new daycare package
// @route   POST /api/daycare
// @access  Private (for now)
const createDaycarePackage = async (req, res) => {
  const { name, description, price, duration, features } = req.body;

  // Simple validation check
  let emptyFields = [];
  if (!name) emptyFields.push('name');
  if (!description) emptyFields.push('description');
  if (!price) emptyFields.push('price');
  if (!duration) emptyFields.push('duration');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all required fields.', emptyFields });
  }

  // Try to add the package to the database
  try {
    const daycarePackage = await DaycarePackage.create({
      name,
      description,
      price,
      duration,
      features: Array.isArray(features) ? features : [features]
    });

    res.status(201).json(daycarePackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDaycarePackages,
  createDaycarePackage
};