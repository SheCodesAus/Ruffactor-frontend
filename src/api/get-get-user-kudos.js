import { getApiBaseUrl } from "./auth.js";

async function getGetUserKudos(token, userId, type) {
  const url = `${getApiBaseUrl()}/api/users/${userId}/${type}-kudos/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const fallbackError = `Error fetching ${type} kudos for user ${userId}`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default getGetUserKudos;