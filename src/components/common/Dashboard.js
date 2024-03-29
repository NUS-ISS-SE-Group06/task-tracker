import { Outlet, Link } from "react-router-dom";
import React from 'react';
import { useState } from "react";
import '../../assets/styles/Style.css';
import { getCookieValue } from '../../services/cookieService';
import { handleLogout } from '../../services/authService';
import '../../assets/styles/Dashboard.css'; // Import CSS file for login component stylesß
import { Table } from "./Table";
import { Modal } from "./Modal";
import UserRegistration from '../../userreg/UserRegistration';
const Dashboard = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },

        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },

        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },
        { "taskName": "Task 9", "taskCreationDate": "25/03/2024 ", "taskAssignmentDate": "27/03/2024", "taskAssignee": "Yudi", "taskDueDate": "30/03/2024", "status": "Draft" },


    ]);

    const [view, setView] = useState('table'); // 'table' is the default view

    const [rowToEdit, setRowToEdit] = useState(null);

    const handleDeleteRow = (targetIndex) => {
        setRows(rows.filter((_, idx) => idx !== targetIndex));
    };

    const handleEditRow = (idx) => {
        setRowToEdit(idx);

        setModalOpen(true);
    };

    const handleSubmit = (newRow) => {
        rowToEdit === null
            ? setRows([...rows, newRow])
            : setRows(
                rows.map((currRow, idx) => {
                    if (idx !== rowToEdit) return currRow;

                    return newRow;
                })
            );
    };

    const role = getCookieValue('userRole')
    if (!role) {
        handleLogout();
    }


    return (
        <div className="container">
            <div className="header">
                <h1>{role === 'ROLE_ADMIN' ? 'Welcome to Administrator Task Tracker Dashboard' : 'Welcome to Task Tracker Dashboard'}</h1>
            </div>

            <div className="app">
                {view === 'table' && (
                    <>

                        <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />

                        {modalOpen && (
                            <Modal
                                closeModal={() => {
                                    setModalOpen(false);
                                    setRowToEdit(null);
                                }}
                                onSubmit={handleSubmit}
                                defaultValue={rowToEdit !== null && rows[rowToEdit]}
                            />
                        )}

                        <Outlet />
                    </>
                )}
                {view === 'userRegistration' && (

                    <UserRegistration></UserRegistration>


                )}
            </div>


            <nav className="nav">
                {role === 'ROLE_ADMIN' && (
                    <ul>
                        <li>
                            <Link onClick={() => setView('userRegistration')} >User Registration </Link>
                        </li>
                        <li>
                            <Link onClick={() => setView('table')} >Task Management</Link>
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
        </div>
    )
};

export default Dashboard;