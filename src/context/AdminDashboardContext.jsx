import {createContext, useContext} from "react";
import useUsers from "../hook/use-users.js";

const AdminDashboardContext = createContext(null);

export const useAdminDashboard = () => {
    return useContext(AdminDashboardContext);
};

export const AdminDashboardProvider = ({children}) => {
    const {users, setUsers, usersIsLoading, usersError} = useUsers();
    return (
        <AdminDashboardContext.Provider
            value={{
                users, setUsers, usersIsLoading, usersError
            }}>
            {children}
        </AdminDashboardContext.Provider>
    );
};