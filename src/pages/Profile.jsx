import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">

      <section className="profile-header">
        <h1>Profile</h1>
        <p>Manage your account and view your activity.</p>
      </section>

      <nav className="profile-nav">
        <Link to="/profile/activity">Activity</Link>
        <Link to="/profile/settings">Settings</Link>
        <Link to="/profile/notifications">Notifications</Link>
      </nav>

      <section className="profile-content">
        <Outlet />
      </section>

    </div>
  );
}

export default Profile;