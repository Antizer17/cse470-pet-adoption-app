import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes';
import AdminProtectedRoute from './components/AdminProtectedRoutes';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import PetListingPage from './components/PetListingPage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import DaycarePackages from './components/DaycarePackages';
import FoodCart from './components/FoodCart';
import AdminDaycare from './components/AdminDaycare'; 
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/foodcart" element={<FoodCart />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Feature 1: User Booking Route */}
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          
          <Route path="/daycare" element={
            <ProtectedRoute>
              <DaycarePackages />
            </ProtectedRoute>
          } />
          
          {/* Feature 2: Admin Check-In/Out & History Routes */}
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />

          <Route path="/admin/daycare" element={ // ✅ Step 2: Add the new Admin path
            <AdminProtectedRoute> 
              <AdminDaycare />
            </AdminProtectedRoute>
          } />

          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/pets" element={<ProtectedRoute><PetListingPage /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;