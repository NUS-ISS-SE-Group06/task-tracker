import { Outlet, Link } from "react-router-dom";
import React from 'react';
import { useEffect, useState } from "react";
import '../../assets/styles/Style.css';
import { getCookieValue } from '../../services/cookieService';
import { handleLogout } from '../../services/authService';
import '../../assets/styles/Dashboard.css'; // Import CSS file for login component stylesß
import { Table } from "./Table";
import { Modal } from "./Modal";
import { UserManagementTbl } from "./UserManagementTbl";
import { UserModal } from "./UserModal";
import { LeaderDashBoardTbl } from "./LeaderDashBoardTbl";
import { LeaderDashBoardModal } from "./LeaderDashBoardModal";
import UserRegistration from '../../userreg/UserRegistration';
import { fetchTaskList, deleteTask } from "../../services/taskService";

const Dashboard = () => {
    const accessToken = getCookieValue('authToken');
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([
    ]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTaskList(accessToken);
                setRows(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setError("Failed to fetch tasks. Please try again later.");
            }
        };

        fetchData();
    }, []);

    const [usermodelOpen, setUserModalOpen] = useState(false);
    const [userrows, setUserRows] = useState([
        { "userId": "000001", "userName": "Williamdou ", "Email": "william@nus.edu", "userRole": "Ordinary", "password": "1234567" }

    ]);


    const [userrowToEdit, setUserRowToEdit] = useState(null);

    const handleUserDeleteRow = (targetIndex) => {
        setUserRows(userrows.filter((_, idx) => idx !== targetIndex));
    };

    const handleUserEditRow = (idx) => {
        setUserRowToEdit(idx);

        setUserModalOpen(true);
    };

    const handleUserSubmit = (newRow) => {
        userrowToEdit === null
            ? setUserRows([...userrows, newRow])
            : setUserRows(
                userrows.map((currRow, idx) => {
                    if (idx !== userrowToEdit) return currRow;

                    return newRow;
                })
            );
    };

    const [view, setView] = useState('table'); // 'table' is the default view

    const [rowToEdit, setRowToEdit] = useState(null);

    const handleDeleteRow = async (targetIndex) => {
        try {
            await deleteTask(rows[targetIndex].taskId); // Call deleteTask function
            setRows(rows.filter((_, idx) => idx !== targetIndex)); // Update rows after successful deletion
        } catch (error) {
            console.error("Error deleting task:", error);
            // Handle error (e.g., display an error message to the user)
        }
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

    const [signupUsername, setSignupUsername] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [userRole, setUserRole] = useState(role);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    const [leadermodelOpen, setLeaderModalOpen] = useState(false);
    const [leaderrows, setLeaderRows] = useState([
        { "userId": "000001", "userName": "Williamdou ", "groupId": "0000001", "groupName": "NUS SE GROUP6", "taskRewardPoint": "100000" },
        { "userId": "000001", "userName": "Williamdou ", "groupId": "0000001", "groupName": "NUS SE GROUP6", "taskRewardPoint": "100000" },
        { "userId": "000001", "userName": "Williamdou ", "groupId": "0000001", "groupName": "NUS SE GROUP6", "taskRewardPoint": "100000" },
        { "userId": "000001", "userName": "Williamdou ", "groupId": "0000001", "groupName": "NUS SE GROUP6", "taskRewardPoint": "100000" },
        { "userId": "000001", "userName": "Williamdou ", "groupId": "0000001", "groupName": "NUS SE GROUP6", "taskRewardPoint": "100000" }

    ]);


    const [leaderrowToEdit, setLeaderRowToEdit] = useState(null);

    const handleLeaderDeleteRow = (targetIndex) => {
        setUserRows(leaderrows.filter((_, idx) => idx !== targetIndex));
    };

    const handleLeaderEditRow = (idx) => {
        setLeaderRowToEdit(idx);

        setLeaderModalOpen(true);
    };

    const handleLeaderSubmit = (newRow) => {
        userrowToEdit === null
            ? setLeaderRows([...leaderrows, newRow])
            : setLeaderRows(
                leaderrows.map((currRow, idx) => {
                    if (idx !== leaderrowToEdit) return currRow;

                    return newRow;
                })
            );
    };




    return (
        <div className="container">
            <div className="header">
                <h1>{role === 'ROLE_ADMIN' ? 'Welcome to Administrator Task Tracker Dashboard' : 'Welcome to Task Tracker Dashboard'}</h1>
            </div>

            <div className="app">
                {view === 'table' && (
                    <>

                        <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} userRole={userRole} />

                        {modalOpen && (
                            <Modal
                                closeModal={() => {
                                    setModalOpen(false);
                                    setRowToEdit(null);
                                }}
                                onSubmit={handleSubmit}
                                defaultValue={rowToEdit !== null && rows[rowToEdit]}
                                accessToken={accessToken}
                                userRole={userRole}
                            />

                        )}

                        <Outlet />
                    </>
                )}
                {view === 'userRegistration' && (

                    <>

                        <UserManagementTbl rows={userrows} deleteRow={handleUserDeleteRow} editRow={handleUserEditRow} />

                        {usermodelOpen && (
                            <UserModal
                                closeModal={() => {
                                    setUserModalOpen(false);
                                    setUserRowToEdit(null);
                                }}
                                onSubmit={handleUserSubmit}
                                defaultValue={userrowToEdit !== null && userrows[userrowToEdit]}
                            />
                        )}

                        <Outlet />
                    </>


                )}
                {view === 'leader' && (

                    <>

                        <LeaderDashBoardTbl rows={userrows} deleteRow={handleLeaderDeleteRow} editRow={handleLeaderEditRow} />

                        {usermodelOpen && (
                            <LeaderDashBoardModal
                                closeModal={() => {
                                    setLeaderModalOpen(false);
                                    setLeaderRowToEdit(null);
                                }}
                                onSubmit={handleLeaderSubmit}
                                defaultValue={leaderrowToEdit !== null && leaderrows[leaderrowToEdit]}
                            />
                        )}

                        <Outlet />
                    </>


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
                            <Link onClick={() => setView('leader')}>LeaderBoard</Link>
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