import React from "react";
import "./GiveKudos.css";
import {useAdminDashboard} from "../context/AdminDashboardContext.jsx";

function UsersSummary() {
    const {users} = useAdminDashboard();
    return (
        <div className="user-summary-card">
            <div className="section-header">
                <h3>Admin Dashboard</h3>
            </div>
        </div>
    );
}

export default UsersSummary;
