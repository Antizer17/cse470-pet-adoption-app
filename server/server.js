const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth Route
app.use('/api/auth', require('./routes/auth'));

// Test Route (Root)
app.get('/', (req, res) => {
  res.json({ message: '🐾 Pet Adoption API is running!' });
});

// Bring in Routes
const daycareRoutes = require('./routes/daycareRoutes.js');
const petRoutes = require('./routes/petRoutes.js');   // IMPORTANT FIX

// Register API Endpoints
app.use('/api/daycare', daycareRoutes);
app.use('/api/pets', petRoutes);

// Database + Server
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 Access at: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });