const express = require('express');
const { 
  getDaycarePackages,
  createDaycarePackage 
} = require('../controllers/daycarePackageController');
const { protect } = require('../middleware/auth');
const DaycarePackage = require('../models/DaycarePackage');

const router = express.Router();

// SEED ROUTE - Add sample data to database
router.get('/seed', async (req, res) => {
  try {
    console.log('🌱 Seeding daycare packages...');
    
    const samplePackages = [
      {
        name: "Basic Daycare",
        price: 500,
        duration: "4 hours",
        description: "Perfect for busy mornings or afternoons",
        features: ["Feeding twice", "Basic grooming", "Play time", "Regular updates"]
      },
      {
        name: "Premium Daycare", 
        price: 800,
        duration: "8 hours", 
        description: "Complete day care for your pet",
        features: ["Feeding three times", "Full grooming", "Training sessions", "Medical checkup"]
      },
      {
        name: "Luxury Package",
        price: 1200,
        duration: "12 hours",
        description: "Ultimate care experience for your pet",
        features: ["Unlimited feeding", "Spa treatment", "One-on-one training", "Veterinary consultation"]
      }
    ];

    await DaycarePackage.deleteMany({});
    const packages = await DaycarePackage.insertMany(samplePackages);
    
    console.log(`✅ Seeded ${packages.length} packages`);
    
    res.json({ 
      success: true,
      message: 'Daycare packages seeded successfully!',
      count: packages.length,
      packages: packages 
    });
  } catch (error) {
    console.error('❌ Seed error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// GET all daycare packages
router.get('/', getDaycarePackages);

// CREATE new daycare package
router.post('/', protect, createDaycarePackage);

module.exports = router;