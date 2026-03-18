import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/AuthContext.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import GiveKudos from "./pages/GiveKudos.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileActivity from "./pages/ProfileActivity.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";
import ProfileNotifications from "./pages/ProfileNotifications.jsx";
import UpdateKudos from "./pages/UpdateKudos.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const goToLogin = () => navigate("/login");
  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(
    location.pathname,
  );
  return (
    <div className="app">
      {isLoggedIn && !isAuthPage && (
        <header className="site-header">
          <nav className="navbar">
            <div className="nav-left">
              <img
                src="img/pp-logo-v.png"
                alt="Pixel Pulse logo"
                className="logo-image"
              />
            </div>

            <ul className="main-nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/give-kudos">Give Kudos</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
                <li>
                    <Link to="/admin-dashboard">Admin Dashboard</Link>
                </li>
            </ul>

            <div className="nav-right">
              <button type="button" className="login-btn" onClick={logout}>
                Logout
              </button>
            </div>
          </nav>
        </header>
      )}

      {/* Removed padding so pages control their own layout */}
      <main>
      <Routes>
  <Route
    path="/"
    element={
      <Home
        isLoggedIn={isLoggedIn}
        handleLogin={goToLogin}
        handleLogout={logout}
      />
    }
  />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/give-kudos" element={<GiveKudos />} />
  <Route path="/update-kudos/:updatingKudosId" element={<UpdateKudos />} />
  <Route path="/admin-dashboard" element={<AdminDashboard />} />

  <Route path="/profile" element={<Profile />}>
    <Route index element={<ProfileActivity />} />
    <Route path="activity" element={<ProfileActivity />} />
    <Route path="settings" element={<ProfileSettings />} />
    <Route path="notifications" element={<ProfileNotifications />} />
  </Route>
</Routes>
      </main>
    </div>
  );
}

export default App;
