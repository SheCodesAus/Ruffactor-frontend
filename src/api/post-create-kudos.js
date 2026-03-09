async function postCreateKudos(recipientId, message, skillIds, image, isOpen) {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : "";
    const url = `${import.meta.env.VITE_API_URL}/kudos/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            "title": title,
            "description": description,
            "goal": goal,
            "image": image,
            "is_open": isOpen
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to create fundraiser`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postCreateKudos;