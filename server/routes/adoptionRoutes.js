// server/routes/adoptionRoutes.js

const express = require("express");
const router = express.Router();
const AdoptionRequest = require("../models/AdoptionRequest");

// POST /api/adoption-requests  → create a new request
router.post("/", async (req, res) => {
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

    if (!petId || !petName || !fullName || !email || !phone || !reason || !experience) {
      return res.status(400).json({ message: "Missing required fields." });
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

    res.status(201).json(request);
  } catch (err) {
    console.error("Error creating adoption request:", err);
    res.status(500).json({ message: "Failed to create adoption request." });
  }
});

// OPTIONAL: GET /api/adoption-requests  → list all requests (for admin)
router.get("/", async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error("Error fetching adoption requests:", err);
    res.status(500).json({ message: "Failed to fetch adoption requests." });
  }
});

module.exports = router;
