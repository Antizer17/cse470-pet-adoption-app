import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify({ name, email, password });

      const res = await axios.post('http://localhost:5000/api/auth/register', body, config);
      
      localStorage.setItem('token', res.data.data.token);
      alert('Registration successful! Welcome to Fursure! 🎉');
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <div className='register-header'>
          <h2>🐾 Join Fursure</h2>
          <p className='slogan'>Start your pet adoption journey today.</p>
        </div>
        
        <form onSubmit={onSubmit}>
          <div className="register-form-group">
            <label htmlFor='name'>Full Name</label>
            <input
              type="text"
              name="name"
              id='name'
              value={name}
              onChange={onChange}
              required
              placeholder="Enter your full name"
            />
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id='email'
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              placeholder="Create a password (min 6 characters)"
            />


            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              placeholder="Confirm your password"
            />
          </div>
          
          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>

        <div className="login-link">
          <p>Already have an account? <a href="/login">Sign in here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;