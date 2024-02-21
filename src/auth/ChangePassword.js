import React, {useState} from 'react';
const ChangePassword = () => {

    // State to hold the input field values
    const [current, setCurrentPassword] = useState('');
    const [password, setNewPassword] = useState('');
    const [verify, setVerifyPassword] = useState('');
    const [errors, setErrors] = useState({});
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation checks
        const validationErrors = {};

        if (!current) {
            validationErrors.current = 'Current password is required';
        }

        if (!password) {
            validationErrors.password = 'New password is required';
        } else if (password.length < 8) {
            validationErrors.password = 'Password must be at least 8 characters';
        } else if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password)) {
            validationErrors.password = 'Password must contain at least one letter and one number';
        }

        if (!verify) {
            validationErrors.verify = 'Please re-enter the new password';
        } else if (verify !== password) {
            validationErrors.verify = 'Passwords do not match';
        }

        // If there are validation errors, update the state and stop submission
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Here you can perform validation and password logic
        console.log('Change password:', { current, password,verify });
        // Clear form fields after submission

        setCurrentPassword('');
        setNewPassword('');
        setVerifyPassword('');
        setErrors({});
    };

    return (
        <div className="login-container">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="current">Current Password:</label>
                    <input
                        type="password"
                        id="current"
                        value={current}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {errors.current && <span className="error">{errors.current}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">New Password:</label>
                    <input
                        type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="verify">Re-enter Password:</label>
                    <input
                        type="password"
                        id="verify"
                        value={verify}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                    {errors.verify && <span className="error">{errors.verify}</span>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}
export default ChangePassword;