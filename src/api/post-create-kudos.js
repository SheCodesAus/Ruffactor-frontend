async function postCreateKudos(selectedRecipients, message, selectedSkills, mediaImage, mediaLink, visibility) {
    window.localStorage.setItem('loggedInUser','{"username":"bridget002","token":"6f65789c1201c2930d3d8892735f655f6646db72"}');
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : "";
    const url = `${import.meta.env.VITE_API_URL}/api/kudos/`;
    const recipientIds = selectedRecipients.map(recipient => recipient.id);
    const skillIds = selectedSkills.map(skill => skill.id);
    const json = JSON.stringify({
        "recipient_ids": recipientIds,
        "message": message,
        "skill_ids": skillIds,
        "visibility": visibility
    });
    console.log(json);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: json
    });

    if (!response.ok) {
        const fallbackError = `Error trying to create kudos`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default postCreateKudos;