// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import PropertyList from './components/PropertyList';
import SellerDashboard from './components/SellerDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute userType="buyer"><PropertyList /></PrivateRoute>} />
          <Route path="/seller-dashboard" element={<PrivateRoute userType="seller"><SellerDashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;









