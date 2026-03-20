import React from "react";
import {useAdminDashboard} from "../context/AdminDashboardContext.jsx";
import UsersSummary from "./UsersSummary.jsx";

function AdminDashboardForm() {
    const {
        usersIsLoading, usersError
    } = useAdminDashboard();

    return (
        <div>
            {
                usersIsLoading ? (<h1>Loading...</h1>) :
                    (usersError ? (<h3>{usersError.message}</h3>) :
                            (
                                <div>
                                    <UsersSummary/>
                                </div>
                            )
                    )
            }
        </div>
    );
}

export default AdminDashboardForm;
