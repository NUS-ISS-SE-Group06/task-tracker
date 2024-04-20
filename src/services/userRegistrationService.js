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

export {fetchUserList}