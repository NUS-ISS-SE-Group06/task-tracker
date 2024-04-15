import { BASE_URL } from "../components/common/Constants";

 const fetchCommentList = async (accessToken,taskId) => {
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


const createComment = async(accessToken,taskId, commentData) => {

    try{
        // Convert taskData to JSON string
        const requestBody = JSON.stringify(commentData);
        
        const response = await fetch(BASE_URL + "/comment-info/create", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: requestBody // Include JSON body in the request
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
