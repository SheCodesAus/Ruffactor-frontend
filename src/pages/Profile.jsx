import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Profile.css";


const NAV_ITEMS = [
  {
    to: "/profile",
    label: "Overview",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    to: "/profile/my-kudos",
    label: "My Kudos",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15 8 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 8" />
      </svg>
    ),
  },
  {
    to: "/profile/settings",
    label: "Settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8A1.6 1.6 0 0 0 3 13H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9c0 .6.4 1.2 1 1.5.2.1.3.1.5.1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" />
      </svg>
    ),
  },
  {
    to: "/profile/appearance",
    label: "Appearance",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4 4l1.5 1.5M18.5 18.5L20 20M1 12h2M21 12h2M4 20l1.5-1.5M18.5 5.5L20 4" />
      </svg>
    ),
  },
];


function ProfileHome() {
  return (
    <div className="profile-home">

      {/* HERO */}
      <section className="profile-hero-card">
        <div className="profile-hero-left">
          <div className="profile-hero-avatar">OK</div>
          <div>
            <h2 className="profile-hero-name">Olga Kozlovskaia</h2>
            <p className="profile-hero-role">Frontend Developer • Pixel Pulse Team</p>
            <p className="profile-hero-meta">Brisbane, Australia</p>
          </div>
        </div>

        <div className="profile-hero-stats">
          <div className="profile-mini-stat">
            <span className="mini-stat-value">24</span>
            <span className="mini-stat-label">Given</span>
          </div>
          <div className="profile-mini-stat">
            <span className="mini-stat-value">18</span>
            <span className="mini-stat-label">Received</span>
          </div>
          <div className="profile-mini-stat">
            <span className="mini-stat-value">8</span>
            <span className="mini-stat-label">Team</span>
          </div>
        </div>
      </section>

      {/* MY KUDOS */}
      <section className="settings-panel">
        <p className="settings-panel-title">My Kudos</p>

        <div className="profile-links-grid">
          <Link to="/profile/my-kudos?tab=given" className="profile-link-card">
            <h3>Kudos Given</h3>
            <p>View recognition you’ve sent.</p>
          </Link>

          <Link to="/profile/my-kudos?tab=received" className="profile-link-card">
            <h3>Kudos Received</h3>
            <p>See what others gave you.</p>
          </Link>

          <Link to="/profile/my-kudos?tab=team" className="profile-link-card">
            <h3>My Team</h3>
            <p>Team activity overview.</p>
          </Link>
        </div>
      </section>

      <section className="settings-panel">
        <p className="settings-panel-title">Settings Snapshot</p>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <span className="profile-info-label">Full Name</span>
            <span className="profile-info-value">Olga Kozlovskaia</span>
          </div>

          <div className="profile-info-item">
            <span className="profile-info-label">Email</span>
            <span className="profile-info-value">olga@pixelpulse.com</span>
          </div>

          <div className="profile-info-item">
            <span className="profile-info-label">Team</span>
            <span className="profile-info-value">Product & QA</span>
          </div>

          <div className="profile-info-item">
            <span className="profile-info-label">Role</span>
            <span className="profile-info-value">Frontend Developer</span>
          </div>
        </div>
      </section>
    </div>
  );
}


function Profile() {
  const location = useLocation();

  const isBaseProfile =
    location.pathname === "/profile" || location.pathname === "/profile/";

  return (
    <div className="settings-page">
      <h1 className="settings-title">Profile</h1>

      <div className="settings-layout">

        
        <aside className="settings-sidebar">
          <nav className="settings-nav">
            {NAV_ITEMS.map(({ to, label, icon }) => {
              const isActive = location.pathname === to || location.pathname.startsWith(to + "/");

              return (
                <Link
                  key={to}
                  to={to}
                  className={`settings-nav-item ${isActive ? "active" : ""}`}
                >
                  <span className="nav-icon">{icon}</span>
                  <span className="nav-label">{label}</span>
                  <svg className="nav-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              );
            })}
          </nav>
        </aside>

      
        <main className="settings-content">
          {isBaseProfile ? <ProfileHome /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default Profile;