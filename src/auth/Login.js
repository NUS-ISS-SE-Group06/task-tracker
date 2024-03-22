import React, { useState } from 'react';
import { login, signUp } from '../services/authService'; // Import the login function from authService
import {setCookie} from '../services/cookieService';
import '../assets/styles/Login.css'; // Import CSS file for login component styles

import { useNavigate } from "react-router-dom";
const Login = (onLogin) => {
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await login(loginUsername, loginPassword);
      // Handle successful login (e.g., store user data, update state, etc.)
      
      // Optionally, call a callback function passed via props to notify parent component of successful login
      if (typeof onLogin === 'function') {
        onLogin(data); // Call the onLogin function with the user data
      }
      console.log('Login successful:', data);
   
      const userRole = data.body.userRole;
  
      setCookie('userRole',userRole,1);
      navigate('/dashboard', {  state: { role: userRole } });
   
    } catch (error) {
      // Handle login error
      setError(error.message);
      console.error('Login failed:', error.message);
      // Optionally, display an error message to the user
    }
     
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setError(``);

    if (signupName.length <= 2) {
      setError(`Invalid Name`);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (signupEmail.length <= 2 || !emailRegex.test(signupEmail)) {
      setError(`Invalid Email Address`);
      return;
    }

    if (signupUsername.length <= 2) {
      setError(`Invalid Username`);
      return;
    } 

    const passwordRegex = /.*[a-zA-Z].*\d.*/; 
    if (signupPassword.length < 8  || signupPassword !== confirmPassword || !passwordRegex.test(signupPassword)) {
      setError(`Invalid Password.\n\n
      Password must be at least 8 characters long
      and contain a combination of letters, numbers, and special characters.`);
      return;
    }
  

  
    try {
      const data = await signUp(signupName,signupEmail,signupUsername,signupPassword);
      setSuccess(`Admin Registration successfully completed. please login using your credentials to create your group`);
      setCookie('userRole','')
      setActiveTab('login');
      console.log('debug:', data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Apologies. We are currently encountering issues at our end. Please attempt User Registration later.");
      } else {
        setError(error.message);
        console.error('Login failed:', error.message);
      }

    }

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
      {error && <p className='error-message'>{error}</p>}
      {success && <p className='success-message'>{success}</p>}
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
        
             
              <pre>{error.message && error.message !== '' &&    <p className='error'>{error.message}</p>}</pre>
          
         
        </form>
      )}
      {activeTab === 'signup' && (
        <form onSubmit={handleSignupSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
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
              type="text"
              placeholder="Username"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
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
