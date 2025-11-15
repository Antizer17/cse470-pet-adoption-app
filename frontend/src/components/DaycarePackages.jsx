import React from 'react';
import './DaycarePackages.css'; // <-- THIS LINE IMPORTS YOUR CSS

// --- This is your "fake" data for FR-13 ---
const daycarePlans = [
  {
    id: 1,
    title: 'Daily Plan',
    price: '300Tk',
    duration: 'per day',
    description: 'Perfect for a single day of fun and care.'
  },
  {
    id: 2,
    title: 'Weekly Plan',
    price: '2000TK',
    duration: 'per week',
    description: 'A great option for the busy work week.'
  },
  {
    id: 3,
    title: 'Monthly Plan',
    price: '7000Tk',
    duration: 'per month',
    description: 'The best value for long-term daycare.'
  }
];
// ------------------------------------------

function DaycarePackages() {
  return (
    <div className="packages-container">
      <h2>🐾 Our Daycare Packages 🐾</h2>
      <div className="packages-grid">
        {/* We map over the fake data array to display a card for each plan */}
        {daycarePlans.map(plan => (
          <div className="package-card" key={plan.id}>
            <h3>{plan.title}</h3>
            <p className="price">{plan.price}</p>
            <p className="duration">{plan.duration}</p>
            <p>{plan.description}</p>
            <button>Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DaycarePackages;