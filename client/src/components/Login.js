import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Add this import
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // Add navigation hook

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
      
      // ✅ Store token
      localStorage.setItem('token', res.data.data.token);
      
      // ✅ Store full user data including role
      const userData = {
        id: res.data.data._id,
        name: res.data.data.name,
        email: res.data.data.email,
        role: res.data.data.role,
        token: res.data.data.token
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('Login successful!', res.data);
      console.log('User role:', res.data.data.role); // Debug log
      
      // ✅ Show welcome message with role
      alert(`Login successful! Welcome ${res.data.data.name} (${res.data.data.role})`);
      
      // ✅ Redirect based on role
      setTimeout(() => {
        if (res.data.data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 500);
      
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data?.message || 'Login failed. Check your coordinates.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className='header'>
          <h2>🐾 Fursure</h2>
          <p className='slogan'>Your one-stop haven for happy pets.</p>
        </div>
        
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
            Login
          </button>
        </form>

        <div className="signup-link">
          <p>Not a member? <a href="/register">Join Fursure</a></p>
        </div>
      </div>
      
      <div className="image-container">
        <img src="https://iili.io/fHM4Fs4.png" alt="Pilot Login" className="login-image" />
      </div>
    </div>
  );
};

export default Login;