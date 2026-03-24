import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchKudosFeed,
  fetchKudosSnapshot,
  fetchSkills,
  fetchUsers,
  fetchUserKudos,
} from "../api/home.js";
import deleteDeleteKudos from "../api/delete-delete-kudos.js";
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

function getEntityId(entity) {
  if (!entity) return null;
  if (typeof entity === "number") return entity;
  if (typeof entity === "string") {
    const parsed = Number(entity);
    return Number.isNaN(parsed) ? null : parsed;
  }
  if (typeof entity === "object") {
    if (typeof entity.id === "number") return entity.id;
    if (typeof entity.user_id === "number") return entity.user_id;
  }
  return null;
}

function getTeamName(user) {
  if (!user || typeof user !== "object") return "";
  if (typeof user.team_name === "string" && user.team_name.trim()) {
    return user.team_name.trim();
  }
  if (typeof user.team === "string" && user.team.trim()) {
    return user.team.trim();
  }
  if (typeof user.team === "object" && typeof user.team?.name === "string") {
    return user.team.name.trim();
  }
  return "";
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
  const skillTags =
    skills.length > 0 ? skills.map((skill) => skill.name) : ["General"];

  // Keep ownership logic resilient to backend serializer differences.
  const ownerId =
    getEntityId(item.sender) ??
    getEntityId(item.from_user) ??
    getEntityId(item.giver) ??
    getEntityId(item.sender_id) ??
    getEntityId(item.giver_id);

  return {
    id: item.id,
    giver: giverName,
    recipient: recipientName,
    timeAgo:
      formatTimeAgo(item.created_at || item.createdAt || item.timestamp) ||
      "Recently",
    skillTags,
    message: item.message || "No message provided.",
    ownerId,
    raw: item,
  };
}

function normalizeListResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user } = useAuth();
  const userIdFilter = React.useMemo(
    () => new URLSearchParams(location.search).get("userId") || "",
    [location.search],
  );

  const [snapshot, setSnapshot] = React.useState(null);
  const [kudosFeed, setKudosFeed] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [usersCache, setUsersCache] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [selectedUserId, setSelectedUserId] = React.useState("");
  const [selectedTeamQuery, setSelectedTeamQuery] = React.useState("");
  const [isSuggestionLocked, setIsSuggestionLocked] = React.useState(false);
  const [selectedSkillId, setSelectedSkillId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFeedLoading, setIsFeedLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [selectedKudos, setSelectedKudos] = React.useState(null);
  const currentUserId = getEntityId(user);
  const searchSuggestions = React.useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query || selectedUserId || isSuggestionLocked) return [];

    const peopleSuggestions = usersCache
      .filter((person) =>
        getDisplayName(person).toLowerCase().includes(query),
      )
      .slice(0, 8)
      .map((person) => ({
        type: "person",
        label: getDisplayName(person),
        value: getEntityId(person),
        payload: person,
      }));

    const skillSuggestions = skills
      .filter(
        (skill) =>
          typeof skill?.name === "string" &&
          skill.name.toLowerCase().includes(query),
      )
      .slice(0, 8)
      .map((skill) => ({
        type: "skill",
        label: skill.name,
        value: getEntityId(skill),
        payload: skill,
      }));

    const uniqueTeams = [...new Set(usersCache.map(getTeamName).filter(Boolean))];
    const teamSuggestions = uniqueTeams
      .filter((teamName) => teamName.toLowerCase().includes(query))
      .slice(0, 8)
      .map((teamName) => ({
        type: "team",
        label: teamName,
        value: teamName,
      }));

    // Keep the suggestion priority explicit for predictable UX.
    return [...peopleSuggestions, ...skillSuggestions, ...teamSuggestions];
  }, [usersCache, skills, searchText, selectedUserId, isSuggestionLocked]);

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
        const [snapshotResponse, skillsResponse, usersResponse, kudosResponse] =
          await Promise.all([
            fetchKudosSnapshot(token),
            fetchSkills(token),
            fetchUsers(token),
            userIdFilter
              ? fetchUserKudos(token, userIdFilter)
              : fetchKudosFeed({ token }),
          ]);

        setSnapshot(snapshotResponse);
        setSkills(normalizeListResponse(skillsResponse));
        setUsersCache(normalizeListResponse(usersResponse));
        setKudosFeed(normalizeListResponse(kudosResponse).map(mapKudosItem));

        // Preserve support for deep-links while keeping the search flow user-driven.
        if (userIdFilter) {
          setSelectedUserId(String(userIdFilter));
        }
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

    // Keep non-user filtering scoped to the default feed only.
    if (selectedUserId || userIdFilter) return;

    const timer = setTimeout(async () => {
      setIsFeedLoading(true);
      setError("");
      try {
        const kudosResponse = await fetchKudosFeed({
          token,
          skillId: selectedSkillId,
          q: selectedTeamQuery,
        });
        setKudosFeed(normalizeListResponse(kudosResponse).map(mapKudosItem));
      } catch (apiError) {
        setError(apiError?.detail || "Could not filter feed right now.");
      } finally {
        setIsFeedLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [
    selectedSkillId,
    selectedTeamQuery,
    token,
    isLoading,
    selectedUserId,
    userIdFilter,
  ]);

  React.useEffect(() => {
    if (!token || isLoading) return;
    if (!selectedUserId && !selectedTeamQuery) return;
    if (searchText.trim()) return;

    async function loadDefaultFeed() {
      setIsFeedLoading(true);
      setError("");
      try {
        // Returning to the default feed uses the base kudos endpoint.
        const kudosResponse = await fetchKudosFeed({
          token,
          skillId: selectedSkillId,
        });
        setKudosFeed(normalizeListResponse(kudosResponse).map(mapKudosItem));
        setSelectedUserId("");
        setSelectedTeamQuery("");
      } catch (apiError) {
        setError(apiError?.detail || "Could not reset feed right now.");
      } finally {
        setIsFeedLoading(false);
      }
    }

    loadDefaultFeed();
  }, [
    searchText,
    selectedUserId,
    selectedTeamQuery,
    token,
    isLoading,
    selectedSkillId,
  ]);

  async function handleUserSelect(person) {
    const personId = getEntityId(person);
    if (!personId || !token) return;

    setSearchText(getDisplayName(person));
    setSelectedUserId(String(personId));
    setSelectedTeamQuery("");
    setIsSuggestionLocked(true);
    setIsFeedLoading(true);
    setError("");

    try {
      const kudosResponse = await fetchUserKudos(token, personId);
      setKudosFeed(normalizeListResponse(kudosResponse).map(mapKudosItem));
    } catch (apiError) {
      setError(apiError?.detail || "Could not load this user's kudos.");
    } finally {
      setIsFeedLoading(false);
    }
  }

  function handleSkillSelect(skill) {
    const skillId = getEntityId(skill);
    if (!skillId) return;

    setSearchText(skill.name || "");
    setSelectedUserId("");
    setSelectedTeamQuery("");
    setSelectedSkillId(String(skillId));
    setIsSuggestionLocked(true);
  }

  function handleTeamSelect(teamName) {
    if (!teamName) return;

    setSearchText(teamName);
    setSelectedUserId("");
    setSelectedTeamQuery(teamName);
    setIsSuggestionLocked(true);
  }

  async function handleDeleteKudos(kudosId) {
    if (!token) return;
    const shouldDelete = window.confirm(
      "Delete this kudos? This action cannot be undone.",
    );
    if (!shouldDelete) return;

    setError("");
    try {
      await deleteDeleteKudos(token, kudosId);
      // Update local feed immediately after a successful delete.
      setKudosFeed((previousFeed) => previousFeed.filter((item) => item.id !== kudosId));
      setSelectedKudos((currentSelected) =>
        currentSelected?.id === kudosId ? null : currentSelected,
      );
    } catch (deleteError) {
      setError(deleteError?.message || "Could not delete this kudos.");
    }
  }

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
            onChange={(e) => {
              const nextValue = e.target.value;
              setSearchText(nextValue);
              // Editing the field re-enables local suggestions.
              setIsSuggestionLocked(false);
              if (selectedUserId) {
                setSelectedUserId("");
              }
              if (selectedTeamQuery) {
                setSelectedTeamQuery("");
              }
            }}
          />
          {searchSuggestions.length > 0 ? (
            <div className="search-suggestions" role="listbox">
              {searchSuggestions.map((suggestion) => {
                const suggestionKey = `${suggestion.type}-${suggestion.value || suggestion.label}`;
                return (
                  <button
                    key={suggestionKey}
                    type="button"
                    className="search-suggestion-item"
                    onClick={() => {
                      if (suggestion.type === "person") {
                        handleUserSelect(suggestion.payload);
                        return;
                      }
                      if (suggestion.type === "skill") {
                        handleSkillSelect(suggestion.payload);
                        return;
                      }
                      handleTeamSelect(suggestion.value);
                    }}
                  >
                    <span className="search-suggestion-main">{suggestion.label}</span>
                    <span
                      className={`search-suggestion-type search-suggestion-type-${suggestion.type}`}
                    >
                      {suggestion.type === "person"
                        ? "Member"
                        : suggestion.type === "skill"
                          ? "Skills"
                          : "Teams"}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="skill-filter-wrap">
          <svg
            className="skill-filter-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
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
        </div>
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
            </div>
            <button
              type="button"
              className="kudos-message kudos-message-btn"
              onClick={() => setSelectedKudos(k)}
            >
              "{k.message}"
            </button>
            <div className="kudos-skills-row">
              <div className="kudos-skills">
                {k.skillTags.map((tag, index) => (
                  <span key={`${k.id}-${tag}-${index}`} className="kudos-tag">
                    {tag}
                  </span>
                ))}
              </div>
              {/* Show owner actions inline with skill chips. */}
              {currentUserId && currentUserId === k.ownerId ? (
                <div className="kudos-owner-actions">
                  <button
                    className="action-btn icon-btn edit-btn"
                    type="button"
                    onClick={() => navigate(`/update-kudos/${k.id}`)}
                    aria-label="Edit kudos"
                    title="Edit kudos"
                  >
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
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                    </svg>
                  </button>
                  <button
                    className="action-btn icon-btn delete-btn"
                    type="button"
                    onClick={() => handleDeleteKudos(k.id)}
                    aria-label="Delete kudos"
                    title="Delete kudos"
                  >
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
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              ) : null}
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
            <div className="kudos-skills">
              {selectedKudos.skillTags.map((tag, index) => (
                <span
                  key={`modal-${selectedKudos.id}-${tag}-${index}`}
                  className="kudos-tag"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="kudos-modal-message">{selectedKudos.message}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
