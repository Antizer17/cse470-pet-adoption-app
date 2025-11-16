import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({ email, password });

      const res = await axios.post('http://localhost:5000/api/auth/login', body, config);
      
      localStorage.setItem('token', res.data.data.token);
      
      console.log('Login successful!', res.data);
      alert('Login successful! Welcome aboard, Pilot!');
      
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed. Check your coordinates.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>🚀 Pilot Login</h2>
        <p>Access Pet Adoption Command Center</p>
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="login-btn">
            🛩️ Engage Login
          </button>
        </form>
        
        <div className="signup-link">
          <p>Not a pilot yet? <a href="/register">Request clearance</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;