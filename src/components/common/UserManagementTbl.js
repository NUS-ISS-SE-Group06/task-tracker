import React,{ useState, useEffect } from "react";

import { BsFillTrashFill, BsFillPencilFill, BsPlus } from "react-icons/bs";

import "./Table.css";
import {  UserModal } from "./UserModal";
import { RiKeyLine } from 'react-icons/ri';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoIosRefreshCircle } from 'react-icons/io';



export const UserManagementTbl = ({ rows, deleteRow, editRow }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredRows = rows.filter(row =>
        row.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddNew = () => {
        setIsAddModalOpen(true);
    };
    return (
        <div className="table-wrapper">
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="add-new-btn" onClick={handleAddNew}><BsPlus /></button>
                {isAddModalOpen && (
                    <UserModal
                        closeModal={() => {
                            setIsAddModalOpen(false);

                        }}

                    />
                )}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th className="expand">User Name</th>
                        <th>Email Address</th>
                        <th>User Role</th>
                        <th>Password Resetting</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.map((row, idx) => {


                        return (
                            <tr key={idx}>
                                <td>{row.userId}</td>
                                <td className="expand">{row.userName}</td>
                                <td>{row.Email}</td>
                                <td>{row.userRole}</td>
                                <td className="fit">
                                    <span className="actions">
                                        <RiLockPasswordLine 
                                            className="delete-btn"
                                            onClick={() => deleteRow(idx)}
                                        />
                                       
                                    </span>
                                </td>



                                <td className="fit">
                                    <span className="actions">
                                        <BsFillTrashFill
                                            className="delete-btn"
                                            onClick={() => deleteRow(idx)}
                                        />
                                        <BsFillPencilFill
                                            className="edit-btn"
                                            onClick={() => editRow(idx)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};