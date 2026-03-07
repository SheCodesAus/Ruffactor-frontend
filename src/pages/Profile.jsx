import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <p>Manage your account and preferences.</p>

      <div className="profile-sections">
        <div className="profile-card">
          <h3>My Profile</h3>
          <p>View and update your personal details.</p>
        </div>

        <div className="profile-card">
          <h3>Notifications</h3>
          <p>Check your recent kudos and alerts.</p>
          <Link to="/notifications">Go to Notifications</Link>
        </div>

        <div className="profile-card">
          <h3>Settings</h3>
          <p>Update account settings and preferences.</p>
          <Link to="/settings">Go to Settings</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
