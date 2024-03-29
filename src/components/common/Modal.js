import React, { useState } from "react";
import "./Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      taskName: "",
      taskCreationDate: "",
      taskAssignmentDate: "",
      taskAssignee: "",
      taskDueDate: "",
      status: "live",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.taskName && formState.taskCreationDate && formState.taskAssignmentDate && formState.taskAssignee && formState.taskDueDate && formState.status) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

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
            <input name="taskName" onChange={handleChange} value={formState.taskName} />
          </div>
          <div className="form-group">
            <label htmlFor="taskCreationDate">Task Creation Date</label>
            <input type="date" name="taskCreationDate" onChange={handleChange} value={formState.taskCreationDate} />
          </div>
          <div className="form-group">
            <label htmlFor="taskAssignmentDate">Task Assignment Date</label>
            <input type="date" name="taskAssignmentDate" onChange={handleChange} value={formState.taskAssignmentDate} />
          </div>
          <div className="form-group">
            <label htmlFor="taskAssignee">Task Assignee</label>
            <input name="taskAssignee" onChange={handleChange} value={formState.taskAssignee} />
          </div>
          <div className="form-group">
            <label htmlFor="taskDueDate">Task Due Date</label>
            <input type="date" name="taskDueDate" onChange={handleChange} value={formState.taskDueDate} />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
            >
              <option value="live">Live</option>
              <option value="draft">Draft</option>
              <option value="error">Error</option>
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