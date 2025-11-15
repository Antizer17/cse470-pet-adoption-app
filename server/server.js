const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🐾 Pet Adoption API is running!' });
});

// Database connection (we'll set up MongoDB properly later)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pet-adoption';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Access at: http://localhost:${PORT}`);
});