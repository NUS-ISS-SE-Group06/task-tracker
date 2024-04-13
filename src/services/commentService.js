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

export {fetchCommentList}
