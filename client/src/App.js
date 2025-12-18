import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes'; // Fix spelling?
import AdminProtectedRoute from './components/AdminProtectedRoutes'; // Fix spelling?
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import PetListingPage from './components/PetListingPage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import DaycarePackages from './components/DaycarePackages';

function App() {
  return (
    <Router>
      <Layout> {/* ✅ ONE Layout for ALL routes */}
        <Routes>
          
          


          <Route path="/foodcart" element={<FoodCart />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          
          <Route path="/home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          
          <Route path="/pets" element={
            <ProtectedRoute>
              <PetListingPage />
            </ProtectedRoute>
          } />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />

          {/* Daycare - probably for all users, not just admin */}
          <Route path="/daycare" element={
            <ProtectedRoute> {/* Changed from AdminProtectedRoute */}
              <DaycarePackages />
            </ProtectedRoute>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;