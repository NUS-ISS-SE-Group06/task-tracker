import { Outlet, Link, useRoutes,useLocation } from "react-router-dom";
import React, { useState } from 'react';
import '../../assets/styles/Style.css';
import {getCookieValue} from '../../services/cookieService';

const Dashboard = ({}) => {

    const location = useLocation();
    const role = location.state && location.state.role;
    console.log(getCookieValue(role))
    return (
        <>
             <nav className="nav-container">
                {role ==='ROLE_ADMIN' && (
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
                
                {role ==='ROLE_USER' && (
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