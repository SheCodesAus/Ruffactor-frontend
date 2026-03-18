import React from "react";
import "./AdminDashboard.css";
import {useAdminDashboard} from "../context/AdminDashboardContext.jsx";

function UsersSummary() {
    const {users} = useAdminDashboard();
    const totalUserCount=users.length;
    const activeUserCount=users.filter(user => user.is_active).length;
    const inactiveUserCount=users.filter(user => !(user.is_active)).length;
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

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </div>
    );
}

export default UsersSummary;
