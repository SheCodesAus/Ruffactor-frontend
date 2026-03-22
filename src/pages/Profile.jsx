import React, { useEffect, useState } from "react";
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

function getInitials(profile) {
  const displayName = profile?.display_name?.trim();
  const firstName = profile?.first_name?.trim();
  const lastName = profile?.last_name?.trim();

  if (displayName) {
    return displayName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }


  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "U";
}

function getFullName(profile) {
  const fullName = `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim();
  return fullName || profile?.display_name || "User";
}

function ProfileHome({ profile }) {
  const fullName = getFullName(profile);
  const initials = getInitials(profile);
  const activeTeamName = profile?.active_team?.name || "No active team";
  const teamsCount = profile?.teams?.length || 0;
  const kudosGiven = profile?.snapshot?.kudos_given || 0;
  const kudosReceived = profile?.snapshot?.kudos_received || 0;

  return (
    <div className="profile-home">
      <section className="profile-hero-card">
        <div className="profile-hero-left">
          <div className="profile-hero-avatar">{initials}</div>
          <div>
            <h2 className="profile-hero-name">{fullName}</h2>
            <p className="profile-hero-role">{activeTeamName}</p>
            <p className="profile-hero-meta">{profile?.email || "No email available"}</p>
          </div>
        </div>

        <div className="profile-hero-stats">
          <div className="profile-mini-stat">
            <span className="mini-stat-value">{kudosGiven}</span>
            <span className="mini-stat-label">Given</span>
          </div>
          <div className="profile-mini-stat">
            <span className="mini-stat-value">{kudosReceived}</span>
            <span className="mini-stat-label">Received</span>
          </div>
          <div className="profile-mini-stat">
            <span className="mini-stat-value">{teamsCount}</span>
            <span className="mini-stat-label">Teams</span>
          </div>
        </div>
      </section>

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
            <span className="profile-info-value">{fullName}</span>
          </div>

          <div className="profile-info-item">
            <span className="profile-info-label">Email</span>
            <span className="profile-info-value">{profile?.email || "Not set"}</span>
          </div>

          <div className="profile-info-item">
            <span className="profile-info-label">Active Team</span>
            <span className="profile-info-value">{activeTeamName}</span>
          </div>

          <div className="profile-info-item">
            <span className="profile-info-label">Bio</span>
            <span className="profile-info-value">{profile?.bio || "No bio yet"}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function Profile() {
  const location = useLocation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isBaseProfile =
    location.pathname === "/profile" || location.pathname === "/profile/";

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setError("No auth token found. Please log in again.");
      setLoading(false);
      return;
    }

    fetch("https://ruffactor-backend-f36fc347ab07.herokuapp.com/auth/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load profile: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Profile fetch error:", error);
        setError("Could not load profile.");
        setLoading(false);
      });
  }, []);

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
          {loading && <p>Loading profile...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && isBaseProfile && <ProfileHome profile={profile} />}
          {!loading && !error && !isBaseProfile && <Outlet context={{ profile }} />}
        </main>
      </div>
    </div>
  );
}

export default Profile;