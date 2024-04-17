import { BASE_URL } from "../components/common/Constants";
import { getCookieValue } from './cookieService';

const accessToken = getCookieValue('authToken');

 const fetchCommentList = async (taskId) => {
    try {
        const response = await fetch(BASE_URL + "/comment-info/comment-list/"+taskId, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch comment list");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching comment list:", error);
        throw error;
    }
};


const createComment = async(taskId, commentData) => {

    try{
        const requestBody = JSON.stringify(commentData);
        
        const response = await fetch(BASE_URL + "/comment-info/create", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: requestBody
        });

        if (!response.ok) {
            throw new Error("Failed to create comment");
        }
        else{
            return "success";
        }

       
    }catch(error){

        console.error("Error fetching comment:", error);
        throw error;
    }
}


export {fetchCommentList,createComment}
