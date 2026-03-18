import React from "react";
import "./AdminDashboard.css";
import {useAdminDashboard} from "../context/AdminDashboardContext.jsx";

function UsersSummary() {
    const {users} = useAdminDashboard();
    return (
        <div>
            <div class="stats-container">
                <div class="stat-card">
                    <div class="icon-box blue">
                        <span class="material-icons">groups</span>
                    </div>
                    <div>
                        <p class="label">Total Users</p>
                        <p class="value">8</p>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="icon-box green">
                        <span class="material-icons">power_settings_new</span>
                    </div>
                    <div>
                        <p class="label">Active Users</p>
                        <p class="value">6</p>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="icon-box red">
                        <span class="material-icons">power_settings_new</span>
                    </div>
                    <div>
                        <p class="label">Inactive Users</p>
                        <p class="value">2</p>
                    </div>
                </div>
            </div>

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </div>
    );
}

export default UsersSummary;
