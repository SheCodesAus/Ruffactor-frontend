import React from "react";
import "./Home.css";

const STATS = [
  { value: 24, label: "Kudos Given", gradient: "var(--stat-gradient-1)" },
  { value: 18, label: "Recipients", gradient: "var(--stat-gradient-2)" },
  { value: 9, label: "Skills Tagged", gradient: "var(--stat-gradient-3)" },
  { value: 3, label: "New Members", gradient: "var(--stat-gradient-4)" },
];

const KUDOS_FEED = [
  {
    id: 1,
    giver: "Alex Chen",
    recipient: "Maria Lopez",
    timeAgo: "2h ago",
    tag: "Leadership",
    message:
      "Maria stepped up during the product launch and coordinated across 5 teams seamlessly. Her leadership made the difference!",
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    giver: "Sam Rivera",
    recipient: "Tom Bradley",
    timeAgo: "4h ago",
    tag: "Innovation",
    message:
      "Tom's new approach to the onboarding flow reduced drop-off by 40%. Incredible creative thinking!",
    likes: 9,
    comments: 2,
  },
  {
    id: 3,
    giver: "Priya Nair",
    recipient: "Jordan Kim",
    timeAgo: "Yesterday",
    tag: "Teamwork",
    message:
      "Jordan jumped in to help our team meet the deadline when things got hectic. Couldn't have done it without them!",
    likes: 21,
    comments: 7,
  },
];

function AvatarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function Home() {
  return (
    <div className="home-page">

      <section className="home-header">
        <h1>Kudos Board</h1>
        <p>Recognise and celebrate great work across the Pixel Pulse team.</p>
      </section>

      {/* Stats */}
      <section className="home-stats-panel">
        <p className="home-stats-title">This Week</p>
        <div className="home-stats-grid">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="stat-card"
              style={{ background: stat.gradient }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Give Kudos */}
      <section className="home-action-bar">
        <div className="search-input-wrap">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search kudos or people..." className="search-input" />
        </div>
        <button className="btn-give-kudos">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Give Kudos
        </button>
      </section>

      {/* Kudos Feed */}
      <section className="kudos-feed">
        {KUDOS_FEED.map((k) => (
          <div key={k.id} className="kudos-card">
            <div className="kudos-card-header">
              <div className="kudos-avatar"><AvatarIcon /></div>
              <div className="kudos-meta">
                <p className="kudos-byline">
                  <strong>{k.giver}</strong> gave kudos to{" "}
                  <span className="kudos-recipient">{k.recipient}</span>
                </p>
                <p className="kudos-time">{k.timeAgo}</p>
              </div>
              <span className="kudos-tag">{k.tag}</span>
            </div>
            <div className="kudos-message">"{k.message}"</div>
            <div className="kudos-card-footer">
              <div className="kudos-actions">
                <button className="action-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                  {k.likes}
                </button>
                <button className="action-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {k.comments}
                </button>
              </div>
              <button className="action-btn share-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                Share
              </button>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}

export default Home;