import React, { useState } from "react";
import "./Modal.css";

export const UserModal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      userId: "",
      userName: "",
      Email: "",
      userRole: "",
      password: ""
   
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.userId && formState.userName && formState.Email && formState.userRole && formState.password) {
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
            <label htmlFor="userId"> User ID</label>
            <input name="userId" onChange={handleChange} value={formState.userId} />
          </div>
          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input type="date" name="taskCreationDate" onChange={handleChange} value={formState.userName} />
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email Address</label>
            <input name="Email" onChange={handleChange} value={formState.Email} />
          </div>
          <div className="form-group">
            <label htmlFor="userRole">User Role</label>
            <input name="userRole" onChange={handleChange} value={formState.userRole} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" onChange={handleChange} value={formState.password} />
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