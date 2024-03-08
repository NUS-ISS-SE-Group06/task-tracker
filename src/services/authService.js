// authService.js

const users = [
  { username: 'user1', password: 'password1', firstLogin: true },
  { username: 'user2', password: 'password2', firstLogin: false },
  // Add more mock users as needed
];

export async function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user) => user.username === username && user.password === password);
      if (user) {
        resolve({ username: user.username });
      } else {
        reject(new Error('Invalid username or password'));
      }
    }, 1000);
  });
}

export function isFirstLogin(username) {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.username === username);

    if (user) {
      // Simulate logic to determine first login status
      // In this example, we're checking the 'firstLogin' property
      if (user.firstLogin) {
        resolve(true); // User is logging in for the first time
      } else {
        resolve(false); // User has logged in before
      }
    } else {
      reject(new Error('User not found'));
    }
  });
}
