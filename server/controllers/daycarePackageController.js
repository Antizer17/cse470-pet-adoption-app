const DaycarePackage = require('../models/DaycarePackage');
const DaycareBooking = require('../models/DaycareBooking');

// --- Sprint 1: Packages ---
const getDaycarePackages = async (req, res) => {
    try {
        const packages = await DaycarePackage.find({ isActive: true }).sort({ createdAt: -1 });
        res.json({ success: true, message: 'Retrieved successfully', data: packages });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const createDaycarePackage = async (req, res) => {
    try {
        const { name, description, price, duration, features } = req.body;
        const daycarePackage = await DaycarePackage.create({ name, description, price, duration, features });
        res.status(201).json({ success: true, data: daycarePackage });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// --- Sprint 2: Feature 1 - Booking (Updated with Date Check) ---
const createBooking = async (req, res) => {
    try {
        const { petName, packageId, bookingDate } = req.body;
        
        // REFIX: Availability Check specifically for the requested date
        const bookingCount = await DaycareBooking.countDocuments({ 
            bookingDate: bookingDate, 
            status: { $ne: 'Cancelled' } 
        });

        if (bookingCount >= 10) {
            return res.status(400).json({ message: "Sorry, Daycare is full for this specific date." });
        }

        const newBooking = new DaycareBooking({
            user: req.user.id, // Authenticated user ID
            petName,
            package: packageId,
            bookingDate
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking successful!", booking: newBooking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- Sprint 2: Feature 2 - Check-In / Check-Out Logic ---
// --- Sprint 2: Feature 2 - Check-In / Check-Out Logic ---
const updateBookingStatus = async (req, res) => {
    try {
        const { id, status } = req.body; 
        
        // 1. Find the booking document first
        const booking = await DaycareBooking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // 2. Update the status
        booking.status = status;

        // 3. FIXED: Set the time explicitly based on the new status
        if (status === 'Checked-In') {
            booking.checkInTime = new Date(); // Saves current server time
        } else if (status === 'Checked-Out') {
            booking.checkOutTime = new Date(); // Saves current server time
        }

        // 4. Save changes to MongoDB
        await booking.save();

        res.status(200).json({
            success: true,
            message: `Pet status updated to ${status}`,
            data: booking
        });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// --- Sprint 2: Feature 2 - Admin Booking List ---
const getBookingStatus = async (req, res) => {
    try {
        const bookings = await DaycareBooking.find()
            .populate('package', 'name price')
            .populate('user', 'name email')
            .sort({ bookingDate: -1 });
        
        res.json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getDaycarePackages,
    createDaycarePackage,
    createBooking,
    updateBookingStatus,
    getBookingStatus
};