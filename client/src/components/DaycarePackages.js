import React, { useState, useEffect } from 'react';
import './DaycarePackages.css';

function DaycarePackages() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  // Feature 1: Daycare Booking
const handleSelectPlan = async (pkg) => {
    const petName = prompt(`Enter pet name for ${pkg.name}:`);
    const bookingDate = prompt("Date (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);

    if (!petName || !bookingDate) return;

    try {
      const token = localStorage.getItem('token'); 
      
      if (!token) {
        alert("Session expired. Please log in again.");
        return;
      }

      const response = await fetch('http://localhost:5000/api/daycare/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token, 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          petName,
          packageId: pkg._id,
          bookingDate
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert(`✅ Booking Successful! This is now recorded in your history.`);
      } else {
        alert(`❌ Server Error: ${result.message || result.error}`);
      }
    } catch (err) {
      alert("❌ Failed to connect to server. Ensure backend is running on port 5000.");
    }
  };

  // --- EXISTING FETCH LOGIC ---

  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/daycare');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        
        let packagesArray = Array.isArray(result) ? result : result.data || result.packages || [];
        setPackages(packagesArray);
      } catch (err) {
        setError("Could not connect to the server: " + err.message); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Loading and Error states (kept same as your code)
  if (isLoading) return <div className="packages-container text-center"><h2>🐾 Loading...</h2></div>;
  if (error) return <div className="packages-container text-center"><h2>❌ Error</h2><p>{error}</p></div>;

  return (
    <div className="packages-container">
      <h2>🐾 Our Daycare Packages 🐾</h2>
      <p className="packages-count">Found {packages.length} package(s)</p>
      
      <div className="packages-grid">
        {packages.map((pkg, index) => (
          <div className="package-card" key={pkg._id || index}>
            <h3>{pkg.name}</h3>
            <p className="price">{pkg.price} TK</p>
            <p className="duration">{pkg.duration}</p>
            <p className="description">{pkg.description}</p>
            
            <div className="features">
              <h4>Features:</h4>
              <ul>
                {pkg.features?.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
            
            {}
            <button 
              className="select-btn" 
              onClick={() => handleSelectPlan(pkg)}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DaycarePackages;