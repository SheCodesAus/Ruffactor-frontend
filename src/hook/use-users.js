import {useState, useEffect} from "react";
import getGetUsers from "../api/get-get-users.js";
import {useAuth} from "../context/AuthContext.jsx";

export default function useUsers() {
    const {isLoggedIn, token, user} = useAuth();
    const [users, setUsers] = useState([]);
    const [usersIsLoading, setUsersIsLoading] = useState(true);
    const [usersError, setUsersError] = useState();
    useEffect(() => {
        getGetUsers(token)
            .then((usersResponse) => {
                console.log(usersResponse);
                setUsers(usersResponse);
                setUsersIsLoading(false);
            })
            .catch((error) => {
                setUsersError(error);
                setUsersIsLoading(false);
            });
    }, []);
    return {users, setUsers, usersIsLoading, usersError};
}