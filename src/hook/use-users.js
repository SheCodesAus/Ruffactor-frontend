import {useState, useEffect} from "react";
import getGetUsers from "../api/get-get-users.js";

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [usersIsLoading, setUsersIsLoading] = useState(true);
    const [usersError, setUsersError] = useState();

    useEffect(() => {
        getGetUsers()
            .then((usersResponse) => {
                console.log(usersResponse);
                setUsers(usersResponse);
                setUsersIsLoading(false);
            })
            .catch((error) => {
                setUsersError(error);
                setUsersIsLoading(false);
            });
    });
    return {users, usersIsLoading, usersError};
}