import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <section className="home-header">
        <h1>Kudos Board</h1>
        <p>Celebrate great work at Pixel Pulse 🎉</p>
      </section>

      <section className="search-section">
        <input type="text" placeholder="Search kudos by employee..." />
      </section>

      <section className="kudos-feed">
        <h2>Recent Kudos</h2>

        <div className="kudos-card">
          <h3>Jane → Mark</h3>
          <p>Great job on the client campaign presentation! 🚀</p>
        </div>

        <div className="kudos-card">
          <h3>Alex → Sarah</h3>
          <p>Thanks for helping the team hit the deadline!</p>
        </div>
      </section>
    </div>
  );
}

export default Home;