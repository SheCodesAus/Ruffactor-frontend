import { getApiBaseUrl } from "./auth.js";

async function getGetSkills(token) {
    const url = `${getApiBaseUrl()}/api/skills`;
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
