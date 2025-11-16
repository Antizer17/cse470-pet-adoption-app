const express = require('express');
const { 
  // These functions are imported from the controller file
  getDaycarePackages,
  createDaycarePackage 
} = require('../controllers/daycarePackageController');

// Create a new router instance
const router = express.Router();

// GET /api/daycare - Fetch all packages
router.get('/', getDaycarePackages);

// POST /api/daycare - Create a new package
// ⭐ CRITICAL FIX: Corrected the typo from 'createDayCodePackage' to 'createDaycarePackage'
router.post('/', createDaycarePackage); 

// Export the router so server.js can use it
module.exports = router;