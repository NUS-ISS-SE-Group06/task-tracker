import { Outlet, Link } from "react-router-dom";
import React from 'react';
import '../../assets/styles/Style.css';
import {getCookieValue} from '../../services/cookieService';
import { handleLogout } from '../../services/authService'; 
const Dashboard = () => {

    const role = getCookieValue('userRole')
    if(!role){
        handleLogout();
    }
   
     

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
                            <Link to="/auditinfo">Task Audit List</Link>
                        </li>
                        <li>
                            <Link onClick={handleLogout} to="/logout">Logout</Link>
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