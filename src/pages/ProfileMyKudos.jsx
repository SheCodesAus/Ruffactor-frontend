import React from "react";
import { Link, useSearchParams } from "react-router-dom";

function ProfileMyKudos() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "given";

  const cards = [
    {
      key: "given",
      title: "Kudos Given",
      value: 24,
      text: "Recognition you’ve sent to teammates.",
    },
    {
      key: "received",
      title: "Kudos Received",
      value: 18,
      text: "Kudos you’ve received from others.",
    },
    {
      key: "team",
      title: "My Team",
      value: 8,
      text: "Team members in your recognition circle.",
    },
  ];

  return (
    <section className="settings-panel">
      <p className="settings-panel-title">My Kudos</p>

      <div className="profile-links-grid">
        {cards.map((card) => (
          <Link
            key={card.key}
            to={`/profile/my-kudos?tab=${card.key}`}
            className={`profile-link-card ${
              activeTab === card.key ? "profile-link-card-active" : ""
            }`}
          >
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <div className="profile-kudos-number">{card.value}</div>
          </Link>
        ))}
      </div>

      <div className="settings-panel" style={{ marginTop: "24px" }}>
        {activeTab === "given" && (
          <>
            <p className="settings-panel-title">Kudos Given</p>
            <p>You’ve sent 24 kudos to teammates this period.</p>
          </>
        )}

        {activeTab === "received" && (
          <>
            <p className="settings-panel-title">Kudos Received</p>
            <p>You’ve received 18 kudos from your team.</p>
          </>
        )}

        {activeTab === "team" && (
          <>
            <p className="settings-panel-title">My Team</p>
            <p>You currently have 8 teammates in your recognition network.</p>
          </>
        )}
      </div>
    </section>
  );
}

export default ProfileMyKudos;