import { Outlet, Link, useRoutes } from "react-router-dom";
import React, { useState } from 'react';
import '../../assets/styles/Style.css';
const Dashboard = () => {
    const [role, setRole]= useState('user')
    
    return (
        <>
             <nav className="nav-container">
                {role ==='admin' && (
                    <ul>
                        <li>
                            <Link to="/usermanagement">User Management</Link>
                        </li>
                        <li>
                            <Link to="/taskmanagement">Task Management</Link>
                        </li>
                        <li>
                            <Link to="/categoryinfo">Category Info</Link>
                        </li>
                        <li>
                            <Link to="/groupinfo">Group Info</Link>
                        </li>
                        <li>
                            <Link to="/auditinfo">Task Audit List</Link>
                        </li>
                    </ul>    
                )}
                
                {role ==='user' && (
                    <ul>
                        <li>
                            <Link to="/tasklist">Task List</Link>
                        </li>
                        <li>
                            <Link to="/leaderboard">LeaderBoard</Link>
                        </li>
                    </ul>    
                )}
                
            </nav>

            <Outlet />
        </>
    )
};

export default Dashboard;