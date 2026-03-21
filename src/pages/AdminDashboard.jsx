import React from "react";
import {AdminDashboardProvider} from "../context/AdminDashboardContext.jsx";
import AdminDashboardForm from "../components/AdminDashboardForm.jsx";

function AdminDashboard() {
    return (
        <AdminDashboardProvider>
            <AdminDashboardForm/>
        </AdminDashboardProvider>
    );
}

export default AdminDashboard;
