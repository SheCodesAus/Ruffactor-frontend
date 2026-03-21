import { getApiBaseUrl } from "./auth.js";

async function getGetKudosById(token,kudosId) {
    const url = `${getApiBaseUrl()}/api/kudos/${kudosId}`;
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
