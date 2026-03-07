import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Track the kudos you’ve received and shared.</p>
      </section>

      <section className="dashboard-summary">
        <div className="summary-card">
          <h3>Received</h3>
          <p>12</p>
        </div>

        <div className="summary-card">
          <h3>Given</h3>
          <p>8</p>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Kudos Received</h2>

        <div className="kudos-card">
          <h3>From Jane</h3>
          <p>Thanks for stepping in and helping with the campaign deadline!</p>
        </div>

        <div className="kudos-card">
          <h3>From Alex</h3>
          <p>Great collaboration and support during the client presentation.</p>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Kudos Given</h2>

        <div className="kudos-card">
          <h3>To Sarah</h3>
          <p>Awesome work pulling together the social media report so quickly.</p>
        </div>

        <div className="kudos-card">
          <h3>To Mark</h3>
          <p>Really appreciated your help reviewing the campaign assets.</p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;