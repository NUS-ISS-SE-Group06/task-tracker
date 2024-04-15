import React, { useState, useEffect } from "react";

import { BsFillTrashFill, BsFillPencilFill, BsPlus } from "react-icons/bs";

import "./Table.css";
import { Modal } from "./Modal";


export const Table = ({ rows, deleteRow, editRow, userRole }) => {

    const isAdmin = userRole === 'ROLE_ADMIN';

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (!isNaN(date)) {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        } else {
            return dateString;
        }
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const filteredRows = rows.filter(row =>
        row.taskName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddNew = () => {
        setIsAddModalOpen(true);
    };
    const handleSubmit = async (formData,taskObj) => {
        // Perform actions with the form data, such as adding a new row to the table
       if(taskObj.body !== null){
        const { createdDate, modifiedDate, taskId } = taskObj.body;
        formData.createdDate = createdDate;
        formData.modifiedDate = modifiedDate;
        formData.taskId = taskId;
        
       }
        // Add the new row to the table
         rows.push(formData);
      
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
                {isAdmin &&<button className="add-new-btn" onClick={handleAddNew}><BsPlus /></button>}
                {isAddModalOpen && (
                    <Modal
                        closeModal={() => {
                            setIsAddModalOpen(false);
                           
                        }}
                        onSubmit={handleSubmit}
                        defaultValue={null}
                        userRole={userRole}
                    />
                )}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th className="expand">Task Creation Date</th>
                        <th>Task Assignment Date</th>
                        <th>Task Assignee</th>
                        <th>Task Due Date</th>
                        <th>Task Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.map((row, idx) => {
                        const statusText = row.taskStatus.charAt(0).toUpperCase() + row.taskStatus.slice(1);
                        return (
                            <tr key={idx}>
                                <td>{row.taskName}</td>
                                <td className="expand">{row.createdDate}</td>
                                <td>{row.modifiedDate}</td>
                                <td>{row.taskAssignee}</td>
                                <td>{formatDate(row.taskDueDate)}</td>
                                <td>
                                    <span className={`label label-${row.taskStatus}`}>
                                        {statusText}
                                    </span>
                                </td>
                                <td className="fit">
                                    <span className="actions">
                                        {isAdmin && <BsFillTrashFill
                                            className="delete-btn"
                                            onClick={() => deleteRow(idx)}
                                        />}
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