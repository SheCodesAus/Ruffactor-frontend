import React from "react";
import "./AdminDashboard.css";
import {useAdminDashboard} from "../context/AdminDashboardContext.jsx";
import {getInitials} from "./utility.js";

function UsersSummary() {
    const {users, setUsers} = useAdminDashboard();
    const totalUserCount = users.length;
    const activeUserCount = users.filter(user => user.is_active).length;
    const inactiveUserCount = users.filter(user => !(user.is_active)).length;
    const toggleStatus = (id) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === id
                    ? {...u, is_active: !(u.is_active)}
                    : u
            )
        );
    };
    return (
        <div>
            <div className="stats-container">
                <div className="stat-card">
                    <div className="icon-box blue">
                        <span className="material-icons">T</span>
                    </div>
                    <div>
                        <p className="label">Total Users</p>
                        <p className="value">{totalUserCount}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="icon-box green">
                        <span className="material-icons">A</span>
                    </div>
                    <div>
                        <p className="label">Active Users</p>
                        <p className="value">{activeUserCount}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="icon-box red">
                        <span className="material-icons">I</span>
                    </div>
                    <div>
                        <p className="label">Inactive Users</p>
                        <p className="value">{inactiveUserCount}</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <table>
                    <thead>
                    <tr>
                        <th>User</th>
                        <th>Active?</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <div className="user">
                                    <div className="avatar2">{getInitials(user.first_name, user.last_name)}</div>
                                    <div className="user-info">
                                        {user.first_name} {user.last_name}
                                    </div>
                                </div>
                            </td>

                            <td>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={user.is_active}
                                        onChange={() => toggleStatus(user.id)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersSummary;
