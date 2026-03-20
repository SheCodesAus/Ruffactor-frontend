import { getApiBaseUrl } from "./auth.js";

function getAuthHeaders(token) {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
}

async function fetchJson(url, token) {
  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function fetchKudosFeed({ token, q = "", skillId = "" }) {
  const baseUrl = `${getApiBaseUrl()}/api/kudos/`;
  const params = new URLSearchParams();

  if (q.trim()) params.set("q", q.trim());
  if (skillId) params.set("skill", String(skillId));

  const url = params.toString() ? `${baseUrl}?${params}` : baseUrl;
  return fetchJson(url, token);
}

export async function fetchKudosSnapshot(token) {
  return fetchJson(`${getApiBaseUrl()}/api/kudos/snapshot/`, token);
}

export async function fetchSkills(token) {
  return fetchJson(`${getApiBaseUrl()}/api/skills/`, token);
}

export async function fetchUserKudos(token, userId) {
  const [given, received] = await Promise.all([
    fetchJson(`${getApiBaseUrl()}/api/users/${userId}/given-kudos/`, token),
    fetchJson(`${getApiBaseUrl()}/api/users/${userId}/received-kudos/`, token),
  ]);

  const givenResults = given.results || given || [];
  const receivedResults = received.results || received || [];
  return [...givenResults, ...receivedResults];
}
