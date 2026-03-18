import {createContext, useContext} from "react";
import useUsers from "../hook/use-users.js";

const AdminDashboardContext = createContext(null);

export const useAdminDashboard = () => {
    return useContext(AdminDashboardContext);
};

export const AdminDashboardProvider = ({children}) => {
    const {users, usersIsLoading, usersError} = useUsers();
    return (
        <AdminDashboardContext.Provider
            value={{
                users, usersIsLoading, usersError
            }}>
            {children}
        </AdminDashboardContext.Provider>
    );
};