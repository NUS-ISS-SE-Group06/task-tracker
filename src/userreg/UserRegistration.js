import React, { useState } from 'react';

import { signUp } from '../services/authService'; // Import the login function from authService
import {getCookieValue} from '../services/cookieService';

import '../assets/styles/Login.css'; // Import CSS file for login component styles
import '../App.css';


const UserRegistration = (onUserRegistration) => {

  const [signupUsername, setSignupUsername] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUserRegSubmit = async (event) => {
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
      const userRole = "ROLE_USER";
      const authToken = getCookieValue('authToken')
      const data = await signUp(signupName,signupEmail,'',userRole, signupUsername,signupPassword, authToken);
      setSuccess(`User Registration successfully completed. please ask user to login using credentials provided`);
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
      {error && <p className='error-message'>{error}</p>}
      {success && <p className='success-message'>{success}</p>}
      
      {
        <form onSubmit={handleUserRegSubmit}>
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

          <button type="submit">Create User</button>
          
        </form>
  
      }
    </div>
  );
};

export default UserRegistration;
