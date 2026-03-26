import {
  Navigate,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { useAuth } from "./context/AuthContext.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import GiveKudos from "./pages/GiveKudos.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileMyKudos from "./pages/ProfileMyKudos.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";
import ProfileAppearance from "./pages/ProfileAppearance.jsx";
import UpdateKudos from "./pages/UpdateKudos.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  const { isLoggedIn, isAuthLoading, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const goToLogin = () => navigate("/login");

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    navigate("/login");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const isAuthPage = ["/login", "/signup", "/forgot-password", "/reset-password"].includes(
    location.pathname,
  );

  const guardRoute = (element) =>
    isLoggedIn ? element : <Navigate to="/login" replace />;

  const adminGuardRoute = (element) =>
    isLoggedIn && user?.is_admin
      ? element
      : <Navigate to="/" replace />;

  if (isAuthLoading) {
    return null;
  }
  

  return (
    <div className="app">
      {isLoggedIn && !isAuthPage && (
        <header className="site-header">
          <nav className="navbar">
            <div className="nav-left">
              <Link to="/" onClick={closeMenu}>
                <img
                  src="/pp-logo-v.png"
                  alt="Pixel Pulse logo"
                  className="logo-image"
                />
              </Link>
            </div>

            <button
              type="button"
              className="hamburger-btn"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>

            <ul className={`main-nav ${isMenuOpen ? "main-nav-open" : ""}`}>
              <li>
                <Link to="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/give-kudos" onClick={closeMenu}>
                  Give Kudos
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={closeMenu}>
                  Profile
                </Link>
              </li>
              {user?.is_admin && (
                <li>
                  <Link to="/AdminDashboard" onClick={closeMenu}>
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </ul>

            <div className={`nav-right ${isMenuOpen ? "nav-right-open" : ""}`}>
              <button
                type="button"
                className="login-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </nav>
        </header>
      )}

      <main>
        <Routes>
          <Route
            path="/"
            element={guardRoute(
              <Home
                isLoggedIn={isLoggedIn}
                handleLogin={goToLogin}
                handleLogout={handleLogout}
              />,
            )}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/give-kudos" element={guardRoute(<GiveKudos />)} />
          <Route
            path="/update-kudos/:updatingKudosId"
            element={guardRoute(<UpdateKudos />)}
          />
          <Route
            path="/AdminDashboard"
            element={adminGuardRoute(<AdminDashboard />)}
          />
          <Route path="/profile" element={guardRoute(<Profile />)}>
            <Route path="my-kudos" element={guardRoute(<ProfileMyKudos />)} />
            <Route path="settings" element={guardRoute(<ProfileSettings />)} />
            <Route
              path="appearance"
              element={guardRoute(<ProfileAppearance />)}
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;