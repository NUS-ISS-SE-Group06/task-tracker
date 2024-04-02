import React from "react";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "./Table.css";


export const UserManagementTbl = ({ rows, deleteRow, editRow }) => {
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th className="expand">User Name</th>
                        <th>Email Address</th>
                        <th>User Role</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => {
                   

                        return (
                            <tr key={idx}>
                                <td>{row.userId}</td>
                                <td className="expand">{row.userName}</td>
                                <td>{row.Email}</td>
                                <td>{row.userRole}</td>
                                <td>{row.password}</td>

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