
// Function to check if a specific cookie exists
export const cookieExists = (cookieName) => {
    return document.cookie.split(';').some((cookie) => cookie.trim().startsWith(`${cookieName}=`));
};
  
// Function to get the value of a specific cookie
export const getCookieValue = (cookieName) => {
    console.log(document.cookie)
    const cookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith(`${cookieName}=`));
    if (cookie) {
        return cookie.split('=')[1];
    }
    return null;
};

// Function to set a cookie with a specified expiry time
export const setCookie = (cookieName, value, expiryDays) => {
   
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    const expiryDate = new Date(Date.now() + expiryDays * 86400e3).toUTCString();
    document.cookie = `${cookieName}=${value}; expires=${expiryDate}; path=/`;
    console.log(document.cookie )
};
// export const setCookie = (userRole) => {
   
//     clearCookie(userRole);
//     document.cookie = `userRole=${userRole}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`;
//     console.log(document.cookie)
// };

// Function to clear a cookie by setting its expiry date to the past
export const clearCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};