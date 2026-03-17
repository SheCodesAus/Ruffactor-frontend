import {createContext, useContext, useState} from "react";

const AdminDashboardContext = createContext(null);

export const useAdminDashboard = () => {
    return useContext(AdminDashboardContext);
};

export const AdminDashboardProvider = ({children}) => {
    const [teamMembers] = useState(
        [
            {id: 1, first_name: "Maria", last_name: "Lopez", "is_active": true},
            {id: 2, first_name: "Tom", last_name: "Bradley", "is_active": false},
            {id: 3, first_name: "Dana", last_name: "Wu", "is_active": true},
            {id: 4, first_name: "Chris", last_name: "Nguyen", "is_active": true},
            {id: 5, first_name: "Sam", last_name: "Rivera", "is_active": false},
            {id: 6, first_name: "Alex", last_name: "Chen", "is_active": true},
            {id: 7, first_name: "Sean", last_name: "Hwang", "is_active": true},
            {id: 8, first_name: "Luke", last_name: "Shan", "is_active": false},
            {id: 9, first_name: "James", last_name: "Douglas", "is_active": true},
        ]
    );
    return (
        <AdminDashboardContext.Provider
            value={{
                teamMembers,
            }}>
            {children}
        </AdminDashboardContext.Provider>
    );
};