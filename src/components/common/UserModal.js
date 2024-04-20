import React, { useState } from "react";
import "./Modal.css";

export const UserModal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      Email: "",
      Name: "",
      PasswordChangeMandatory: false
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.email && formState.name && formState.passwordChangeMandatory) {
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
            <label htmlFor="Name">Name</label>
            <input name="Name" onChange={handleChange} value={formState.name} />
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email Address</label>
            <input name="Email" onChange={handleChange} value={formState.email} />
          </div>
          <div className="form-group">
            <label htmlFor="PasswordChangeMandatory">Reset Password</label>
            <select
              name="PasswordChangeMandatory"
              onChange={handleChange}
              value={formState.passwordChangeMandatory}>
              <option value="TRUE">Yes</option>
              <option value="FALSE">No</option>
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