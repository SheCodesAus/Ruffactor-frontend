import React from "react";
import "./Home.css";

function Home({ isLoggedIn, handleLogin, handleLogout }) {
  return (
    <div className="home-page">
      <section className="home-header">
        <h1>Kudos Board</h1>
        <p>Recognise and celebrate great work across the Pixel Pulse team.</p>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <h3>Give Kudos</h3>
          <p>Recognize teammates for great work and collaboration.</p>
        </div>

        <div className="feature-card">
          <h3>Track Recognition</h3>
          <p>See the kudos you've received and shared.</p>
        </div>

        <div className="feature-card">
          <h3>Team Culture</h3>
          <p>Build a culture of appreciation across the company.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
