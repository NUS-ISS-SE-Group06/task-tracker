import { BASE_URL } from "../components/common/Constants";
import { getCookieValue } from './cookieService';

 const fetchUserList = async () => {
    try {
        const accessToken = getCookieValue('authToken');
        const response = await fetch(BASE_URL + "/userlist", {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

const editUserInfo = async(userRegData) => {
    console.log(userRegData)
    const accessToken = getCookieValue('authToken');
     
    try{
        // Convert userRegData to JSON string
        const requestBody = JSON.stringify(userRegData);
        
        const response = await fetch(BASE_URL + "/userupdate", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: requestBody // Include JSON body in the request
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }
        else{
            const userRegObj = response.json();
            return userRegObj;
        }
    }catch(error){
        console.error("Error updating User Registration Info:", error);
        throw error;
    }
}

export {fetchUserList, editUserInfo}