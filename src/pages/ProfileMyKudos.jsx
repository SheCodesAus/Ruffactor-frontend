import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useOutletContext } from "react-router-dom";
import getGetUserKudos from "../api/get-get-user-kudos";

function ProfileMyKudos() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "given";
  const { profile } = useOutletContext();

  const [kudosList, setKudosList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const kudosGiven = profile?.snapshot?.kudos_given ?? 0;
  const kudosReceived = profile?.snapshot?.kudos_received ?? 0;
  const teamCount = profile?.teams?.length ?? 0;

  useEffect(() => {
    const fetchKudosDetails = async () => {
      if (activeTab === "team" || !profile?.id) {
        setKudosList([]);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("auth_token");
        const type = activeTab === "given" ? "given" : "received";

        const data = await getGetUserKudos(token, profile.id, type);

        
        setKudosList(data?.results || data || []);
      } catch (err) {
        console.error(err);
        setError("Could not load kudos details.");
      } finally {
        setLoading(false);
      }
    };

    fetchKudosDetails();
  }, [activeTab, profile?.id]);

  const cards = [
    {
      key: "given",
      title: "Kudos Given",
      value: kudosGiven,
      text: "Recognition you’ve sent to teammates.",
    },
    {
      key: "received",
      title: "Kudos Received",
      value: kudosReceived,
      text: "Kudos you’ve received from others.",
    },
    {
      key: "team",
      title: "My Team",
      value: teamCount,
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
            <p>You’ve sent {kudosGiven} kudos to teammates this period.</p>
          </>
        )}

        {activeTab === "received" && (
          <>
            <p className="settings-panel-title">Kudos Received</p>
            <p>You’ve received {kudosReceived} kudos from your team.</p>
          </>
        )}

        {activeTab === "team" && (
          <>
            <p className="settings-panel-title">My Team</p>
            <p>You currently have {teamCount} teammates in your recognition network.</p>
          </>
        )}

{activeTab !== "team" && loading && (
  <p style={{ marginTop: "16px" }}>Loading kudos…</p>
)}

{activeTab !== "team" && error && (
  <p style={{ marginTop: "16px" }}>{error}</p>
)}

{activeTab !== "team" && !loading && !error && kudosList.length === 0 && (
  <p style={{ marginTop: "16px" }}>
    {activeTab === "given"
      ? "You haven’t given any kudos yet."
      : "You haven’t received any kudos yet."}
  </p>
)}

        {activeTab !== "team" && !loading && !error && kudosList.length > 0 && (
          <div className="kudos-detail-list">
            {kudosList.map((kudo) => (
              <div key={kudo.id} className="profile-info-item">
                <span className="profile-info-label">
                  {activeTab === "given" ? "Recipient" : "Sender"}
                </span>
                <span className="profile-info-value">
                  {activeTab === "given"
                    ? kudo.recipient?.display_name ||
                      kudo.recipient?.first_name ||
                      "Unknown"
                    : kudo.sender?.display_name ||
                      kudo.sender?.first_name ||
                      "Unknown"}
                </span>

                <span className="profile-info-label">Message</span>
                <span className="profile-info-value">
                  {kudo.message || "No message"}
                </span>

                <span className="profile-info-label">Date</span>
                <span className="profile-info-value">
                  {kudo.created_at
                    ? new Date(kudo.created_at).toLocaleDateString()
                    : "Unknown date"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProfileMyKudos;