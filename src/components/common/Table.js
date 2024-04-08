import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";


export const Table = ({ rows, deleteRow, editRow, userRole }) => {
    
    const isAdmin = userRole === 'ROLE_ADMIN';
    const formatDate = (dateString)=>{
        const date = new Date(dateString);

        // Check if the date is a valid Date object
        if (!isNaN(date)) {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        } else {
            // If the dateString is not in datetime format, return it as is
            return dateString;
        }
    }

    return (
        <div className="table-wrapper">
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
                    {rows.map((row, idx) => {
                        const statusText =
                            row.taskStatus.charAt(0).toUpperCase() + row.taskStatus.slice(1);

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