import { BASE_URL } from "../components/common/Constants";

 const fetchTaskList = async (accessToken) => {
    try {
        
      
        const response = await fetch(BASE_URL + "/taskinfo/tasklist", {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};
const deleteTask = async(accessToken,taskId) =>{

    try{
        
        const response = await fetch(BASE_URL + "/taskinfo/delete/"+taskId, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }
        else{
            return "success";
        }

       
    }catch(error){

        console.error("Error fetching tasks:", error);
        throw error;
    }

}
const editTask = async(accessToken,taskId, taskData) => {

    try{
        // Convert taskData to JSON string
        const requestBody = JSON.stringify(taskData);
        
        const response = await fetch(BASE_URL + "/taskinfo/update/"+taskId, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: requestBody // Include JSON body in the request
        });

        if (!response.ok) {
            throw new Error("Failed to update task");
        }
        else{
            const taskObj = response.json();
            return taskObj;
        }

       
    }catch(error){

        console.error("Error fetching tasks:", error);
        throw error;
    }
}
const createTask = async (accessToken, taskData) => {
    try {
        const requestBody = JSON.stringify(taskData);
        const response = await fetch(BASE_URL + "/taskinfo/create", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: requestBody
        });

        if (!response.ok) {
            throw new Error("Failed to create task");
            
        } else {
            const taskObj = response.json();
            return taskObj;
        }
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export {fetchTaskList, deleteTask, editTask, createTask}
