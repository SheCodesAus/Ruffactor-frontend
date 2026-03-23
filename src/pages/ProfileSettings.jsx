import React from "react";
import { useOutletContext } from "react-router-dom";

function ProfileSettings() {
  const { profile } = useOutletContext();

  const fullName =
    `${profile?.first_name || ""} ${profile?.last_name || ""}`.trim() ||
    profile?.display_name ||
    "Not set";

    const email = profile?.email || "Not set";
    const team = profile?.active_team?.name || "No active team";
    const role = "Not set"; 
    const timezone = "Not set"; 
    const language = "Not set"; 

  return (
    <section className="settings-panel">
      <p className="settings-panel-title">Settings</p>

      <div className="profile-info-grid">
        <div className="profile-info-item">
          <span className="profile-info-label">Full Name</span>
          <span className="profile-info-value">{fullName}</span>
        </div>

        <div className="profile-info-item">
          <span className="profile-info-label">Email</span>
          <span className="profile-info-value">{email}</span>
        </div>

        <div className="profile-info-item">
          <span className="profile-info-label">Team</span>
          <span className="profile-info-value">{team}</span>
        </div>

        <div className="profile-info-item">
          <span className="profile-info-label">Role</span>
          <span className="profile-info-value">{role}</span>
        </div>

        <div className="profile-info-item">
          <span className="profile-info-label">Timezone</span>
          <span className="profile-info-value">{timezone}</span>
        </div>

        <div className="profile-info-item">
          <span className="profile-info-label">Preferred Language</span>
          <span className="profile-info-value">{language}</span>
        </div>
      </div>
    </section>
  );
}

export default ProfileSettings;