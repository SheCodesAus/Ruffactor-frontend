async function patchUpdateKudos(
  id,
  selectedRecipients,
  message,
  selectedSkills,
  mediaImage,
  mediaLink,
  visibility,
) {
  window.localStorage.setItem(
    "loggedInUser",
    '{"username":"bridget008","token":"1962ce91f14eb704f8e9c4810449388c7a531853"}',
  );
  const loggedInUser = window.localStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : "";
  const url = `${import.meta.env.VITE_API_URL}/api/kudos/${id}/`;
  const recipientIds = selectedRecipients.map((recipient) => recipient.id);
  const skillIds = selectedSkills.map((skill) => skill.id);
  const json = JSON.stringify({
    recipient_ids: recipientIds,
    message: message,
    skill_ids: skillIds,
  });
  console.log(json);
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: json,
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
