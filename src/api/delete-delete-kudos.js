async function deleteDeleteKudos(token, kudosId) {
    const url = `${import.meta.env.VITE_API_URL}/kudos/${kudosId}`;
    const response = await fetch(url, {
        method: "DELETE", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    });

    if (!response.ok) {
        const fallbackError = `Error trying to delete kudos`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }
}

export default deleteDeleteKudos;