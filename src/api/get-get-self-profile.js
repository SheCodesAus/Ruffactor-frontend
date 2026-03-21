import { getApiBaseUrl } from "./auth.js";

async function getGetSelfProfile(token) {
    const url = `${getApiBaseUrl()}/auth/profile`;
    const response = await fetch(url, {
        method: "GET", headers: {
            "Authorization": `Token ${token}`
        }
    });

  if (!response.ok) {
    const fallbackError = "Error getting self profile";
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default getGetSelfProfile;
