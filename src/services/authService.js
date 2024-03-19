// auth/loginApi.js
import BASE_URL from '../components/common/Constants';
//const BASE_URL = 'http://localhost:8688/api/userinfo'; // Replace with your actual API base URL

const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/userinfo/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
   
    if (data.error !== "") {
      throw new Error('Login failed!');
    }

   
    return data; // Assuming your API returns some data upon successful login
  } catch (error) {
  
    console.error('Error logging in:', error);
    throw error;
  }
};
export { login }; 