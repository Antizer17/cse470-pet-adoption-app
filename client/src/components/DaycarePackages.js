import React, { useState, useEffect } from 'react';
import './DaycarePackages.css';

function DaycarePackages() {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('🔄 Fetching daycare packages from API...');
        const response = await fetch('http://localhost:5000/api/daycare');

        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('📦 Full API response:', result);
        console.log('🔍 Response type:', typeof result);
        console.log('🔍 Is array?', Array.isArray(result));
        
        // Handle different response formats
        let packagesArray = [];
        
        if (Array.isArray(result)) {
          // Case 1: Direct array response
          packagesArray = result;
          console.log('✅ Using direct array response');
        } else if (result && Array.isArray(result.data)) {
          // Case 2: { success: true, data: [...] } format
          packagesArray = result.data;
          console.log('✅ Using result.data array');
        } else if (result && result.success && Array.isArray(result.data)) {
          // Case 3: { success: true, data: [...] } with success check
          packagesArray = result.data;
          console.log('✅ Using result.data with success check');
        } else if (result && Array.isArray(result.packages)) {
          // Case 4: { packages: [...] } format
          packagesArray = result.packages;
          console.log('✅ Using result.packages array');
        } else {
          // Case 5: Unexpected format
          console.warn('⚠️ Unexpected response format:', result);
          packagesArray = [];
        }
        
        console.log(`✅ Final packages array length: ${packagesArray.length}`);
        console.log('📦 Packages data:', packagesArray);
        
        setPackages(packagesArray);
        setError(null);

      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setError("Could not connect to the server: " + err.message); 
        setPackages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="packages-container text-center loading">
        <h2>🐾 Our Daycare Packages 🐾</h2>
        <p>Loading packages from the server...</p>
        <div className="loading-spinner">⏳</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="packages-container text-center error">
        <h2>🐾 Our Daycare Packages 🐾</h2>
        <p style={{ color: 'red', fontWeight: 'bold' }}>Error Loading Packages</p>
        <p>{error}</p>
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <h4>🔧 Troubleshooting Steps:</h4>
          <ol style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>Ensure backend is running on port 5000</li>
            <li>Check if <code>http://localhost:5000/api/daycare</code> works in browser</li>
            <li>Verify database connection</li>
            <li>Check browser console for detailed errors</li>
          </ol>
        </div>
        <button 
          onClick={() => window.location.reload()}
          style={{ marginTop: '15px', padding: '10px 20px' }}
        >
          Retry
        </button>
      </div>
    );
  }
  
  // Empty state
  if (!packages || packages.length === 0) {
    return (
      <div className="packages-container text-center no-data">
        <h2>🐾 Our Daycare Packages 🐾</h2>
        <p>No daycare packages found.</p>
        <p>The database might be empty or there's a connection issue.</p>
        <button 
          onClick={() => window.open('http://localhost:5000/api/daycare/seed', '_blank')}
          style={{ marginTop: '10px', padding: '10px 20px' }}
        >
          Add Sample Data
        </button>
      </div>
    );
  }

  // Success state - with safety checks
  return (
    <div className="packages-container">
      <h2>🐾 Our Daycare Packages 🐾</h2>
      <p className="packages-count">Found {packages.length} package(s)</p>
      
      <div className="packages-grid">
        {packages.map((pkg, index) => (
          <div className="package-card" key={pkg._id || pkg.id || index}>
            <h3>{pkg.name || 'Unnamed Package'}</h3>
            <p className="price">{pkg.price || 'N/A'} TK</p>
            <p className="duration">{pkg.duration || 'Duration not specified'}</p>
            <p className="description">{pkg.description || 'No description available'}</p>
            
            {pkg.features && Array.isArray(pkg.features) && pkg.features.length > 0 ? (
              <div className="features">
                <h4>Features:</h4>
                <ul>
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="no-features">No features listed</p>
            )}
            
            <button className="select-btn">Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DaycarePackages;