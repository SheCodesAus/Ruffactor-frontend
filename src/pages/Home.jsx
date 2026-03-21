import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchKudosFeed,
  fetchKudosSnapshot,
  fetchSkills,
  fetchUserKudos,
} from "../api/home.js";
import { useAuth } from "../context/AuthContext.jsx";
import "./Home.css";

function AvatarIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function CountUpNumber({ value, duration = 900 }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return count;
}

function getDisplayName(user) {
  if (!user) return "";

  if (typeof user === "string") return user;

  if (user.display_name && user.display_name.trim()) return user.display_name;

  const fullName = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (fullName) return fullName;

  return user.email || "";
}

function formatTimeAgo(value) {
  if (!value) return "";

  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "";

  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function mapKudosItem(item) {
  const giverName =
    getDisplayName(item.sender) ||
    item.giver_name ||
    getDisplayName(item.from_user) ||
    "Someone";

  const recipientCandidate = Array.isArray(item.recipients)
    ? item.recipients[0]
    : item.recipient;
  const recipientName =
    getDisplayName(recipientCandidate) ||
    item.recipient_name ||
    getDisplayName(item.to_user) ||
    "a teammate";

  const skills = Array.isArray(item.skills) ? item.skills : [];
  const primarySkill = skills.length > 0 ? skills[0] : null;

  return {
    id: item.id,
    giver: giverName,
    recipient: recipientName,
    timeAgo:
      formatTimeAgo(item.created_at || item.createdAt || item.timestamp) ||
      "Recently",
    tag: primarySkill?.name || "General",
    message: item.message || "No message provided.",
    raw: item,
  };
}

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const userIdFilter = React.useMemo(
    () => new URLSearchParams(location.search).get("userId") || "",
    [location.search],
  );

  const [snapshot, setSnapshot] = React.useState(null);
  const [kudosFeed, setKudosFeed] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [selectedSkillId, setSelectedSkillId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFeedLoading, setIsFeedLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [selectedKudos, setSelectedKudos] = React.useState(null);

  const stats = React.useMemo(
    () => [
      {
        value: snapshot?.kudos_given ?? 0,
        label: "Kudos Given",
        gradient: "var(--stat-gradient-1)",
        icon: "⭐",
      },
      {
        value: snapshot?.kudos_received ?? 0,
        label: "Kudos Received",
        gradient: "var(--stat-gradient-2)",
        icon: "👥",
      },
    ],
    [snapshot],
  );

  React.useEffect(() => {
    if (!token) return;

    async function loadInitialData() {
      setIsLoading(true);
      setError("");
      try {
        const [snapshotResponse, skillsResponse, kudosResponse] =
          await Promise.all([
            fetchKudosSnapshot(token),
            fetchSkills(token),
            userIdFilter
              ? fetchUserKudos(token, userIdFilter)
              : fetchKudosFeed({ token }),
          ]);

        setSnapshot(snapshotResponse);
        setSkills(skillsResponse.results || skillsResponse || []);
        setKudosFeed(
          (kudosResponse.results || kudosResponse || []).map(mapKudosItem),
        );
      } catch (apiError) {
        setError(apiError?.detail || "Could not load home feed right now.");
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, [token, userIdFilter]);

  React.useEffect(() => {
    if (!token || isLoading) return;

    if (userIdFilter) return;

    const timer = setTimeout(async () => {
      setIsFeedLoading(true);
      setError("");
      try {
        const kudosResponse = await fetchKudosFeed({
          token,
          q: searchText,
          skillId: selectedSkillId,
        });
        setKudosFeed(
          (kudosResponse.results || kudosResponse || []).map(mapKudosItem),
        );
      } catch (apiError) {
        setError(apiError?.detail || "Could not filter feed right now.");
      } finally {
        setIsFeedLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchText, selectedSkillId, token, isLoading, userIdFilter]);

  return (
    <div className="home-page">
      <section className="home-header">
        <h1>Kudos Board</h1>
        <p>Recognise and celebrate great work across the Pixel Pulse team.</p>
      </section>

      {/* Stats */}
      <section className="home-stats-panel">
        <p className="home-stats-title">This Week</p>
        <p className="home-stats-subtitle">
          A quick snapshot of team recognition activity.
        </p>
        <div className="home-stats-grid">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card"
              style={{ background: stat.gradient }}
            >
              <div className="stat-icon">{stat.icon}</div>

              <span className="stat-value">
                <CountUpNumber value={stat.value} />
              </span>

              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Give Kudos */}
      <section className="home-action-bar">
        <div className="search-input-wrap">
          <svg
            className="search-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search team or people..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <select
          className="skill-filter"
          value={selectedSkillId}
          onChange={(e) => setSelectedSkillId(e.target.value)}
        >
          <option value="">All skills</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
        <button
          className="btn-give-kudos"
          onClick={() => navigate("/give-kudos")}
          type="button"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Give Kudos
        </button>
      </section>

      {/* Kudos Feed */}
      <section className="kudos-feed">
        {error ? <p className="home-error">{error}</p> : null}
        {isLoading || isFeedLoading ? (
          <p className="home-loading">Loading feed...</p>
        ) : null}
        {!isLoading && !isFeedLoading && !error && kudosFeed.length === 0 ? (
          <p className="home-empty">No kudos found for this filter yet.</p>
        ) : null}

        {kudosFeed.map((k) => (
          <div key={k.id} className="kudos-card">
            <div className="kudos-card-header">
              <div className="kudos-avatar">
                <AvatarIcon />
              </div>
              <div className="kudos-meta">
                <p className="kudos-byline">
                  <strong>{k.giver}</strong> gave kudos to{" "}
                  <span className="kudos-recipient">{k.recipient}</span>
                </p>
                <p className="kudos-time">{k.timeAgo}</p>
              </div>
              <span className="kudos-tag">{k.tag}</span>
            </div>
            <button
              type="button"
              className="kudos-message kudos-message-btn"
              onClick={() => setSelectedKudos(k)}
            >
              "{k.message}"
            </button>
            <div className="kudos-card-footer">
              <div className="kudos-actions">
                <button className="action-btn" type="button">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                </button>
                <button className="action-btn" type="button">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
              </div>
              <button className="action-btn share-btn" type="button">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share
              </button>
            </div>
          </div>
        ))}
      </section>

      {selectedKudos ? (
        <div
          className="kudos-modal-backdrop"
          onClick={() => setSelectedKudos(null)}
        >
          <div className="kudos-modal" onClick={(e) => e.stopPropagation()}>
            <div className="kudos-modal-header">
              <h3>Kudos Details</h3>
              <button
                type="button"
                className="kudos-modal-close"
                onClick={() => setSelectedKudos(null)}
              >
                ×
              </button>
            </div>
            <p>
              <strong>{selectedKudos.giver}</strong> gave kudos to{" "}
              <strong>{selectedKudos.recipient}</strong>
            </p>
            <p className="kudos-modal-time">{selectedKudos.timeAgo}</p>
            <span className="kudos-tag">{selectedKudos.tag}</span>
            <p className="kudos-modal-message">{selectedKudos.message}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
