import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const isDevAuthMode = import.meta.env.DEV;
  const isLoggedIn = isDevAuthMode ? true : isLoggedInState;

  const login = () => setIsLoggedInState(true);
  const logout = () => {
    // Keep user "logged in" during local dev until backend auth is connected.
    if (isDevAuthMode) return;
    setIsLoggedInState(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
