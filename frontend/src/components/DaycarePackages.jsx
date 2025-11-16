// X:\cse470-pet-adoption-app\frontend\src\components\DaycarePackages.jsx

import React, { useState, useEffect } from 'react';
import './DaycarePackages.css'; 

// NOTE: The hardcoded 'daycarePlans' array is removed!

function DaycarePackages() {
  // 1. State for data, loading status, and errors
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. useEffect hook for data fetching
  useEffect(() => {
    const fetchPackages = async () => {
      // Reset status when starting a fetch
      setIsLoading(true);
      setError(null);
      
      try {
        // Use the relative path /api/daycare
        // This relies on the Vite proxy we configured in vite.config.js
        const response = await fetch('/api/daycare'); 

        if (!response.ok) {
          // If the server responded with an error status (400, 500)
          const errorBody = await response.json();
          throw new Error(errorBody.error || `Failed to fetch: Status ${response.status}`);
        }

        const data = await response.json();
        setPackages(data); // Update state with REAL data
        setError(null);

      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Could not connect to the server or fetch data: " + err.message); 
        setPackages([]); // Clear packages on error
      } finally {
        setIsLoading(false); // Stop loading indicator
      }
    };

    fetchPackages();
  }, []); // Empty dependency array runs this ONCE on mount

  // --- Conditional Rendering States ---

  if (isLoading) {
    return (
      <div className="packages-container text-center loading">
        <h2>🐾 Our Daycare Packages 🐾</h2>
        <p>Loading packages from the server...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="packages-container text-center error">
        <h2>🐾 Our Daycare Packages 🐾</h2>
        <p style={{ color: 'red' }}>**Error:** {error}</p>
        <p>Please ensure your backend server is running on port 5000.</p>
      </div>
    );
  }
  
  if (packages.length === 0) {
    return (
      <div className="packages-container text-center no-data">
        <h2>🐾 Our Daycare Packages 🐾</h2>
        <p>No packages found in the database. Check MongoDB Atlas.</p>
      </div>
    );
  }

  // --- Main Render Logic (Using REAL API Data) ---
  return (
    <div className="packages-container">
      <h2>🐾 Our Daycare Packages 🐾</h2>
      <div className="packages-grid">
        {/* This code now ONLY maps over the 'packages' state variable */}
        {packages.map(pkg => (
          <div className="package-card" key={pkg._id}> {/* Use pkg._id for the key */}
            <h3>{pkg.name}</h3> {/* Use properties from your Mongoose schema */}
            <p className="price">**{pkg.price}TK**</p> 
            <p className="duration">{pkg.duration}</p> 
            <p>{pkg.description}</p>
            {/* If you have a 'features' array in your schema, you can map it here */}
            {pkg.features && Array.isArray(pkg.features) && (
              <ul>
                {pkg.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
            <button>Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DaycarePackages;