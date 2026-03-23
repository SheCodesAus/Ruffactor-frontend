import React, { useEffect, useState } from "react";

function ProfileAppearance() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <section className="settings-panel">
      <p className="settings-panel-title">Appearance</p>

      <div className="profile-info-grid">
        <div className="profile-info-item">
          <span className="profile-info-label">Current Theme</span>
          <span className="profile-info-value">
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </span>
        </div>

        <div className="profile-info-item">
          <span className="profile-info-label">Switch To</span>
          <span className="profile-info-value">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </div>
      </div>

      <div className="settings-save-row">
        <button className="btn-save" type="button" onClick={handleToggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </section>
  );
}

export default ProfileAppearance;