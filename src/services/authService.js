// authService.js

// Mock user data for authentication
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    // Add more mock users as needed
  ];
  
  export async function login(username, password) {
    // Simulate an asynchronous operation with setTimeout
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          resolve({ username: user.username }); // Mock user object
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 1000); // Simulate 1 second delay
    });
  }
  