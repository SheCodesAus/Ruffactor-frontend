import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { useState } from "react";

import Home from "./pages/Home.jsx";
import GiveKudos from "./pages/GiveKudos.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Notifications from "./pages/Notifications.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

const handleLogin = () => {
  setIsLoggedIn(true);
};

const handleLogout = () => {
  setIsLoggedIn(false);
};
  return (
    <div className="app">
      <header className="site-header">
  <nav className="navbar">
    <div className="nav-left">
    <img src="/logo.png" alt="Pixel Pulse logo" className="logo-image" />
    </div>

    <ul className="main-nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/give-kudos">Give Kudos</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>

    <div className="nav-right">
      {isLoggedIn ? (
        <button className="login-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <button className="signup-btn">
            Sign Up
          </button>
        </>
      )}
    </div>
  </nav>
</header>

       {/* Removed padding so pages control their own layout */}
      <main>
        <Routes>
          <Route
                path="/"
                element={<Home isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />}
/>

          <Route path="/give-kudos" element={<GiveKudos />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
