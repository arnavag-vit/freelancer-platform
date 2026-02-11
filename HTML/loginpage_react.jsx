import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/loginpage.css';

// Import images
import backgroundImage from '../Assets/Images/common_backround_image.svg';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    general: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Form validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: '', password: '', general: '' };
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demonstration purposes, let's consider only this user valid
      if (formData.username === 'demo' && formData.password === 'password123') {
        // Store user info in local storage or context
        localStorage.setItem('user', JSON.stringify({
          username: formData.username,
          isLoggedIn: true
        }));
        
        // Redirect to homepage
        navigate('/homepage');
      } else {
        setErrors({
          ...errors,
          general: 'Invalid username or password'
        });
      }
    } catch (error) {
      setErrors({
        ...errors,
        general: 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle forgot password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // In a real app, this would redirect to password reset page
    alert('Password reset functionality will be implemented soon!');
  };

  return (
    <main className="login-page">
      <div className="background-image"></div>
      <div className="page-container">
        <div className="content-wrapper">
          <header className="brand-header">
            <h1 className="brand-name">LinkLancer</h1>
          </header>
          <img src={backgroundImage} alt="Background" className="background-image" />
          <section className="login-section">
            <h2 className="welcome-message">
              It's great having you back.<br />
              Let's start working!
            </h2>

            {errors.general && (
              <div className="error-message general-error">
                {errors.general}
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? 'error-input' : ''}
                />
                {errors.username && (
                  <div className="error-message">{errors.username}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error-input' : ''}
                />
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="login-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Log in'}
                </button>
                <a 
                  href="#" 
                  className="forgot-password"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;