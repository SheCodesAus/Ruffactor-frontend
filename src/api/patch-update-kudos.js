async function patchUpdateKudos(id, recipientId, message, skillIds, media, link, visibility) {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : "";
    const url = `${import.meta.env.VITE_API_URL}/kudos/${id}`;

    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            "recipient": recipientId,
            "message": message,
            "skills": skillIds,
            "media": media,
            "link": link,
            "visibility": visibility
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to update kudos`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default patchUpdateKudos;