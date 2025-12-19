const express = require('express');
const router = express.Router();
// ✅ UPDATE THIS LINE to include getBookingStatus
const { 
    getDaycarePackages, 
    createBooking, 
    updateBookingStatus, 
    getBookingStatus 
} = require('../controllers/daycarePackageController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getDaycarePackages);

// Feature 1: Daycare Booking
router.post('/book', protect, createBooking);

// Feature 2: Admin History & Check-In
router.get('/history', protect, getBookingStatus); 
router.put('/status', protect, updateBookingStatus);

module.exports = router;