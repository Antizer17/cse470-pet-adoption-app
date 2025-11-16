const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// CRITICAL IMPORT: Import your new daycare routes
const daycareRoutes = require('./routes/daycareRoutes'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🐾 Pet Adoption API is running!' });
});

// CRITICAL FIX: Register your new API endpoint
app.use('/api/daycare', daycareRoutes); 

// Database connection & Server Listener Logic
const MONGODB_URI = process.env.MONGODB_URI; 
const PORT = process.env.PORT || 5000;

// Connect to DB and start listener only if successful
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    // Start listening for requests
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 Access at: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });