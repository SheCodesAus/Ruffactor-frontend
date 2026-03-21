import { getApiBaseUrl } from "./auth.js";

async function getGetUsers(token) {
    const url = `${getApiBaseUrl()}/api/users`;
    const response = await fetch(url, {
        method: "GET", headers: {
            "Authorization": `Token ${token}`
        }
    });

    if (!response.ok) {
        // TEST ONLY. Remove when the endpoint is ready.
        return [
            { id: 1, first_name: "Maria", last_name: "Lopez", "is_active": true },
            { id: 2, first_name: "Tom", last_name: "Bradley", "is_active": false },
            { id: 3, first_name: "Dana", last_name: "Wu", "is_active": true },
            { id: 4, first_name: "Chris", last_name: "Nguyen", "is_active": true },
            { id: 5, first_name: "Sam", last_name: "Rivera", "is_active": false },
            { id: 6, first_name: "Alex", last_name: "Chen", "is_active": true },
            { id: 7, first_name: "Sean", last_name: "Hwang", "is_active": true },
            { id: 8, first_name: "Luke", last_name: "Tseng", "is_active": false },
            { id: 9, first_name: "James", last_name: "Douglas", "is_active": true },
            { id: 10, first_name: "Kate", last_name: "Mcconaughy", "is_active": false },
        ];
        const fallbackError = "Error fetching users";
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

  return await response.json();
}

export default getGetUsers;
