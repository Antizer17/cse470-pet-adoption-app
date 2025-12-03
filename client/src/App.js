// client/src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// -------- PAGES --------
import HomePage from "./pages/HomePage";              // Sameer’s Home UI (placeholder)
import PetListingPage from "./pages/PetListingPage";  // Feature 8: list
import PetDetailsPage from "./pages/PetDetailsPage";  // ⭐ NEW: Feature 9: details

// -------- AUTH COMPONENTS --------
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <Router>
      <div
        style={{
          padding: "25px",
          background: "#FFF7EF",
          minHeight: "100vh",
          fontFamily: "Poppins, Arial, sans-serif",
        }}
      >
        {/* ---- WEBSITE TITLE ---- */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "800",
            color: "#333",
            marginBottom: "30px",
          }}
        >
          🐾 Fursure Pet Adoption
        </h1>

        {/* ---- NAV BAR ---- */}
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <Link
            to="/"
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              background: "#FFE3D8",
              border: "1px solid #F5C1A8",
              textDecoration: "none",
              fontWeight: "600",
              color: "#333",
            }}
          >
            🔐 Login
          </Link>

          <Link
            to="/home"
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              background: "#FFE3D8",
              border: "1px solid #F5C1A8",
              textDecoration: "none",
              fontWeight: "600",
              color: "#333",
            }}
          >
            🏠 Home
          </Link>

          <Link
            to="/pets"
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              background: "#E8F9FF",
              border: "1px solid #A4D7E1",
              textDecoration: "none",
              fontWeight: "600",
              color: "#333",
            }}
          >
            🐶 Pet Listings
          </Link>

          <Link
            to="/register"
            style={{
              padding: "10px 18px",
              borderRadius: "12px",
              background: "#FFEFF9",
              border: "1px solid #F2C0E6",
              textDecoration: "none",
              fontWeight: "600",
              color: "#333",
            }}
          >
            📝 Register
          </Link>
        </nav>

        {/* ---- ROUTES ---- */}
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main pages */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/pets" element={<PetListingPage />} />

          {/* ⭐ NEW: Feature 9 – single pet details */}
          <Route path="/pets/:id" element={<PetDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
