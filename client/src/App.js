import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import ProductStore from './components/ProductStore';
import DaycarePackages from './components/DaycarePackages';
import FoodCart from "./components/FoodCart";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/store" element={<ProductStore />} />
          <Route path="/foodcart" element={<FoodCart />} />
          <Route path="/daycare" element={<DaycarePackages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;