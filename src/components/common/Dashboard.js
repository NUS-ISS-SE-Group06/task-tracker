import { Outlet, Link } from "react-router-dom";
import React from 'react';
import '../../assets/styles/Style.css';
import { getCookieValue } from '../../services/cookieService';
import { handleLogout } from '../../services/authService';
import '../../assets/styles/Dashboard.css'; // Import CSS file for login component stylesß
const Dashboard = () => {

    const role = getCookieValue('userRole')
    if (!role) {
        handleLogout();
    }

    // Define the dummy data
    const data = [
        // Each object in this array represents a row in the table
        // Fill in the actual data here
        { "Task Name": "Task 1", "Task Creation Date": "2024-03-25", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "William", "Task Progress": "50%", "Task Due Date": "2024-03-30 " },
        { "Task Name": "Task 2", "Task Creation Date": "2024-03-25 ", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "Yudi", "Task Progress": "50%", "Task Due Date": "2024-03-30 " },
        { "Task Name": "Task 3", "Task Creation Date": "2024-03-25 ", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "Yew Hoon", "Task Progress": "50%", "Task Due Date": "2024-03-30 " },

        { "Task Name": "Task 4", "Task Creation Date": "2024-03-25 ", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "Britta", "Task Progress": "50%", "Task Due Date": "2024-03-30 " },

        { "Task Name": "Task 5", "Task Creation Date": "2024-03-25 ", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "Balaji", "Task Progress": "50%", "Task Due Date": "2024-03-30 " },
        { "Task Name": "Task 6", "Task Creation Date": "2024-03-25 ", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "Balaji", "Task Progress": "50%", "Task Due Date": "2024-03-30 " },
        { "Task Name": "Task 7", "Task Creation Date": "2024-03-25 ", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "Balaji", "Task Progress": "50%", "Task Due Date": "2024-03-30 " },
        { "Task Name": "Task 8", "Task Creation Date": "2024-03-25 ", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "William", "Task Progress": "50%", "Task Due Date": "2024-03-30 " },
        { "Task Name": "Task 9", "Task Creation Date": "2024-03-25 ", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "Yudi", "Task Progress": "50%", "Task Due Date": "2024-03-30 " },
        { "Task Name": "Task 10", "Task Creation Date": "2024-03-25 ", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "Britta", "Task Progress": "50%", "Task Due Date": "2024-03-30 " },
        { "Task Name": "Task 11", "Task Creation Date": "2024-03-25 ", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "Britta", "Task Progress": "50%", "Task Due Date": "2024-03-30 " },
        { "Task Name": "Task 1", "Task Creation Date": "2024-03-25", "Task Assignment Date": "2024-03-27 ", "Task Assignee": "William", "Task Progress": "50%", "Task Due Date": "2024-03-30 " }
      
    ];

    return (
        <>

            <div className="header">
                <h1>{role === 'ROLE_ADMIN' ? 'Welcome to Administrator Task Tracker Dashboard' : 'Welcome to Task Tracker Dashboard'}</h1>
            </div>
            <div className="dashboard">
                <table>
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Task Creation Date</th>
                            <th>Task Assignment Date</th>
                            <th>Task Assignee</th>
                            <th>Task Progress</th>
                            <th>Task Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row["Task Name"]}</td>
                                <td>{row["Task Creation Date"]}</td>
                                <td>{row["Task Assignment Date"]}</td>
                                <td>{row["Task Assignee"]}</td>
                                <td>{row["Task Progress"]}</td>
                                <td>{row["Task Due Date"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Outlet />
            </div>
            <nav className="nav">
                {role === 'ROLE_ADMIN' && (
                    <ul>
                        <li>
                            <Link to="/userregistration">User Registration</Link>
                        </li>
                        <li>
                            <Link to="/taskmanagement">Task Management</Link>
                        </li>
                        <li>
                            <Link to="/leaderboard">LeaderBoard</Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout} to="/logout">Logout</Link>
                        </li>
                    </ul>
                )}

                {role === 'ROLE_USER' && (
                    <ul>
                        <li>
                            <Link to="/tasklist">Task List</Link>
                        </li>
                        <li>
                            <Link to="/leaderboard">LeaderBoard</Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul>
                )}

            </nav>

            <Outlet />
        </>
    )
};

export default Dashboard;