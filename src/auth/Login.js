import React, { useState } from 'react';
import { login } from '../services/authService'; // Import the login function from authService
import '../assets/styles/Login.css'; // Import CSS file for login component styles

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(loginUsername, loginPassword); // Call the login function from authService
      console.log('Login successful');
      setLoginUsername('');
      setLoginPassword('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="login-container">
      <div className="tabs">
        <button
          className={activeTab === 'login' ? 'active' : ''}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={activeTab === 'signup' ? 'active' : ''}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>
      {error && <p>{error}</p>}
      {activeTab === 'login' && (
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
      {activeTab === 'signup' && (
        <form onSubmit={handleSignupSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default Login;