import React from "react";

function ProfileAppearance() {
  return (
    <section className="settings-panel">
      <p className="settings-panel-title">Appearance</p>

      <div className="profile-links-grid">
        <div className="profile-info-item">
          <span className="profile-info-label">Theme</span>
          <span className="profile-info-value">Light Mode</span>
        </div>

        <div className="profile-info-item">
          <span className="profile-info-label">Alternate Theme</span>
          <span className="profile-info-value">Dark Mode</span>
        </div>
      </div>

      <div className="settings-save-row">
        <button className="btn-save" type="button">
          Toggle Light / Dark
        </button>
      </div>
    </section>
  );
}

export default ProfileAppearance;