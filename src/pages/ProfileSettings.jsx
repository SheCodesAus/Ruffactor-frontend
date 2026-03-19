import React from "react";

function ProfileSettings() {
  return (
    <section className="settings-panel">
      <p className="settings-panel-title">Settings</p>

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

        <div className="profile-info-item">
          <span className="profile-info-label">Timezone</span>
          <span className="profile-info-value">Australia/Brisbane</span>
        </div>

        <div className="profile-info-item">
          <span className="profile-info-label">Preferred Language</span>
          <span className="profile-info-value">English</span>
        </div>
      </div>
    </section>
  );
}

export default ProfileSettings;