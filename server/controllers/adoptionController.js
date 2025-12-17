const AdoptionRequest = require("../models/AdoptionRequest");

// @desc    Create a new adoption request
// @route   POST /api/adoption-requests
// @access  Public
const createAdoptionRequest = async (req, res) => {
  try {
    const {
      petId,
      petName,
      fullName,
      email,
      phone,
      reason,
      experience,
      preferredDate,
    } = req.body;

    // Validation
    if (!petId || !petName || !fullName || !email || !phone || !reason || !experience) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields." 
      });
    }

    const request = await AdoptionRequest.create({
      petId,
      petName,
      fullName,
      email,
      phone,
      reason,
      experience,
      preferredDate,
    });

    res.status(201).json({
      success: true,
      message: 'Adoption request submitted successfully',
      data: request
    });
  } catch (err) {
    console.error("Error creating adoption request:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create adoption request."
    });
  }
};

// @desc    Get all adoption requests
// @route   GET /api/adoption-requests
// @access  Private/Admin
const getAdoptionRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: requests.length,
      message: 'Adoption requests retrieved successfully',
      data: requests
    });
  } catch (err) {
    console.error("Error fetching adoption requests:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch adoption requests."
    });
  }
};

module.exports = {
  createAdoptionRequest,
  getAdoptionRequests
};