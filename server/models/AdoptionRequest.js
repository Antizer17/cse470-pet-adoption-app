// server/models/AdoptionRequest.js

const mongoose = require("mongoose");

const AdoptionRequestSchema = new mongoose.Schema(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    petName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    preferredDate: {
      type: String, // keep as string for simplicity (e.g. "2025-01-18")
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdoptionRequest", AdoptionRequestSchema);
