async function getGetKudosById(kudosId) {
    window.localStorage.setItem('loggedInUser', '{"username":"bridget008","token":"e225b05076be773d808905224624c662094d414f"}');
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : "";
    const url = `${import.meta.env.VITE_API_URL}/api/kudos/${kudosId}`;
    const response = await fetch(url, {
        method: "GET", headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
    });

    if (!response.ok) {
        const fallbackError = `Error fetching kudos with id ${kudosId}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default getGetKudosById;