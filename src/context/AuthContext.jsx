import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, loginUser, signupUser } from "../api/auth.js";

const AuthContext = createContext(null);
const TOKEN_STORAGE_KEY = "auth_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY),
  );
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const isLoggedIn = Boolean(token);

  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        setUser(null);
        setIsAuthLoading(false);
        return;
      }

      setIsAuthLoading(true);

      try {
        const profile = await getProfile(token);
        setUser(profile);
      } catch (error) {
        console.error("Failed to restore session:", error);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    }

    restoreSession();
  }, [token]);

  async function login(credentials) {
    const data = await loginUser(credentials);

    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    setToken(data.token);

    try {
      const profile = await getProfile(data.token);
      setUser(profile);
    } catch (error) {
      console.error("Failed to fetch profile after login:", error);
      setUser(data.user || null);
    }

    return data;
  }

  async function signup(payload) {
    return signupUser(payload);
  }

  function logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAuthLoading,
        token,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
}