import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home.jsx";
import GiveKudos from "./pages/GiveKudos.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Notifications from "./pages/Notifications.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <div className="app">
      <header>
  <nav>
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
  </nav>
</header>

       {/* Removed padding so pages control their own layout */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
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
