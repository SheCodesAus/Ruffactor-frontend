async function getGetSkills() {
    window.localStorage.setItem('loggedInUser', '{"username":"bridget002","token":"6f65789c1201c2930d3d8892735f655f6646db72"}');
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : "";
    const url = `${import.meta.env.VITE_API_URL}/api/skills`;
    const response = await fetch(url, {
        method: "GET", headers: {
            "Authorization": `Token ${token}`
        }
    });

    if (!response.ok) {
        const fallbackError = "Error fetching skills";
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default getGetSkills;