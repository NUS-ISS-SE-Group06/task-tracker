import React, { useState,useEffect } from "react";
import "./Modal.css";
import { createTask, editTask } from "../../services/taskService";

export const Modal = ({ closeModal, onSubmit, defaultValue, userRole}) => {

 
  const [formState, setFormState] = useState({
    taskName: "",
    taskDescription: "",
    taskAssignee: "",
    taskDueDate: "",
    taskStatus: "Pending",
    ...defaultValue, // Spread defaultValue to merge with default state
  });
  const [errors, setErrors] = useState("");
  useEffect(() => {
    if (defaultValue) {
        // Format date values

        const taskDueDate = new Date(defaultValue.taskDueDate);
        const localTimezoneOffset = taskDueDate.getTimezoneOffset() * 60000; // Timezone offset in milliseconds
        const localTaskDueDate = new Date(taskDueDate.getTime() - localTimezoneOffset);
        const formattedTaskDueDate = localTaskDueDate.toISOString().split('T')[0];

        // Set formatted date values and taskStatus
        setFormState(prevState => ({
            ...prevState,
            taskDueDate: formattedTaskDueDate,
            taskStatus: defaultValue.taskStatus // Set taskStatus from defaultValue
        }));
    }else{
       // Set default values
       setFormState({
        taskName: "",
        taskDescription: "",
        taskAssignee: "",
        taskDueDate: "", // You can set a default due date here
        taskStatus: "Pending" // You can set a default status here
    });

    }
}, [defaultValue]);

  const validateForm = () => {
    if (formState.taskName && formState.taskDescription && formState.taskAssignee && formState.taskDueDate && formState.taskStatus) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form");

    if (!validateForm()) return;

    try {
        const taskData = {
            taskName: formState.taskName,
            taskDescription: formState.taskDescription,
            taskAssignee: formState.taskAssignee,
            taskDueDate: formState.taskDueDate + "T00:00:00.000Z",
            taskStatus: formState.taskStatus
        };

        if (defaultValue) {
            const response = await editTask(formState.taskId, taskData);
            if (response !== null && response.error === "") {
                onSubmit(formState);
                closeModal();
            } else {
               setErrors(response.error);
               throw new Error("Failed to edit task"+response.error);
               
                
            }
        } else {
            const response = await createTask(taskData);
            if (response !== null && response.error === "") {
          
                onSubmit(formState,response);
                closeModal();
            } else {
                setErrors(response.error);
                throw new Error("Failed to create task"+response.error);
            }
        }
    } catch (error) {
        setErrors(error);
        console.error("Error handling task submission:", error);
        return false;
        // Handle error (e.g., display an error message to the user)
    }
};

  const isAdmin = userRole === 'ROLE_ADMIN';

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="taskName">Task Name</label>
            <input name="taskName" onChange={handleChange} value={formState.taskName} readOnly={!isAdmin}/>
          </div>
          <div className="form-group">
            <label htmlFor="taskDescription">Task Description</label>
            <textarea name="taskDescription" onChange={handleChange} value={formState.taskDescription} readOnly={!isAdmin} />
          </div>
          <div className="form-group">
            <label htmlFor="taskAssignee">Task Assignee</label>
            <input name="taskAssignee" onChange={handleChange} value={formState.taskAssignee} readOnly={!isAdmin}/>
          </div>
          <div className="form-group">
            <label htmlFor="taskDueDate">Task Due Date</label>
            <input type="date" name="taskDueDate" onChange={handleChange} value={formState.taskDueDate} readOnly={!isAdmin}/>
          </div>
          <div className="form-group">
            <label htmlFor="taskStatus">Status</label>
            <select
              name="taskStatus"
              onChange={handleChange}
              value={formState.taskStatus}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};