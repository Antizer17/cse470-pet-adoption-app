const DaycarePackage = require('../models/DaycarePackage');

// @desc    Get all daycare packages
// @route   GET /api/daycare
// @access  Public
const getDaycarePackages = async (req, res) => {
  try {
    const packages = await DaycarePackage.find({ isActive: true }).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: 'Daycare packages retrieved successfully',
      data: packages
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching packages'
    });
  }
};

// @desc    Create a daycare package
// @route   POST /api/daycare
// @access  Private/Admin
const createDaycarePackage = async (req, res) => {
  try {
    const { name, description, price, duration, features } = req.body;

    // Check if package already exists
    const packageExists = await DaycarePackage.findOne({ name });
    if (packageExists) {
      return res.status(400).json({
        success: false,
        message: 'Package with this name already exists'
      });
    }

    const daycarePackage = await DaycarePackage.create({
      name,
      description,
      price,
      duration,
      features
    });

    res.status(201).json({
      success: true,
      message: 'Daycare package created successfully',
      data: daycarePackage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating package'
    });
  }
};

module.exports = {
  getDaycarePackages,
  createDaycarePackage
};