const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "/heroku-api"
    : "https://ruffactor-backend-f36fc347ab07.herokuapp.com");

function getJsonHeaders(token) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Token ${token}`;
  }

  return headers;
}

export async function signupUser(payload) {
  const response = await fetch(`${API_BASE_URL}/auth/signup/`, {
    method: "POST",
    headers: getJsonHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function loginUser(payload) {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: getJsonHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function getProfile(token) {
  const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
    method: "GET",
    headers: getJsonHeaders(token),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw data;
  }

  return data;
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}
