import React, { useState } from 'react';
import './LoginPage.css';
import backgroundImage from './Assets/Images/common_backround_image.svg';

function LoginPage() {
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    if (username.toLowerCase() === 'org') {
      window.location.href = 'homepage_org.html';
    } else {
      window.location.href = 'homepage.html';
    }
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

            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
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
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="login-button">Log in</button>
                <a href="homepage_org.html" className="forgot-password">Forgot password?</a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;