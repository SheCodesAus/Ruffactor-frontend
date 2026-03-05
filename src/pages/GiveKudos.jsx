import React, {useState} from "react";
import "./GiveKudos.css";

function GiveKudos() {
    const [selectedRecipients, setSelectedRecipients] = useState([1]);
    const [message, setMessage] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [currentSender] = useState("Jordan");

    const teamMembers = [
        {id: 1, name: "Maria Lopez", initial: "ML"},
        {id: 2, name: "Tom Bradley", initial: "TB"},
        {id: 3, name: "Dana Wu", initial: "DW"},
        {id: 4, name: "Chris Nguyen", initial: "CN"},
        {id: 5, name: "Sam Rivera", initial: "SR"},
        {id: 6, name: "Alex Chen", initial: "AC"},
    ];

    const allSkills = [
        {id: 1, name: "Leadership"},
        {id: 2, name: "Communication"},
        {id: 3, name: "Problem Solving"},
        {id: 4, name: "Teamwork"},
        {id: 5, name: "Creativity"},
        {id: 6, name: "Technical Excellence"},
    ];

    const tips = [
        "Be specific about what they did",
        "Explain the impact on the team",
        "Tag relevant skills",
        "Keep it genuine and personal",
    ];

    const handleSelectRecipient = (recipient) => {
        setSelectedRecipients((prev) =>
            prev.includes(recipient) ? prev.filter((r) => r !== recipient) : [...prev, recipient]
        );
    };

    const handleSelectSkill = (skill) => {
        setSelectedSkills((prev) =>
            prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
        );
    };

    const characterCount = message.length;
    const maxCharacters = 500;

    return (
        <div className="give-kudos-container">
            {/* Main Content */}
            <div className="give-kudos-main">
                {/* Header */}
                <div className="give-kudos-header">
                    <button className="back-button">← Back</button>
                    <h1>Give Kudos</h1>
                </div>

                {/* Form Section */}
                <form className="give-kudos-form">
                    {/* Recipient Selection */}
                    <div className="section recipient-section">
                        <div className="section-header">
                            <h3>WHO ARE YOU RECOGNIZING?</h3>
                        </div>

                        <div className="team-members-grid">
                            {teamMembers.filter((r) => selectedRecipients.includes(r.id)).map((member) => (
                                <button
                                    key={member.id}
                                    type="button"
                                    className={`team-member selected`}
                                    onClick={() => handleSelectRecipient(member.id)}
                                >
                                    <div className="avatar">{member.initial}</div>
                                    <span>{member.name}</span>
                                </button>
                            ))}
                        </div>

                        <input
                            type="text"
                            placeholder="Search team members..."
                            className="search-input"
                        />

                        <div className="team-members-grid">
                            {teamMembers.map((member) => (
                                <button
                                    key={member.id}
                                    type="button"
                                    className={`team-member ${selectedRecipients.includes(member.id) ? "selected" : ""
                                    }`}
                                    onClick={() => handleSelectRecipient(member.id)}
                                >
                                    <div className="avatar">{member.initial}</div>
                                    <span>{member.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="section message-section">
                        <div className="section-header">
                            <h3>YOUR MESSAGE</h3>
                            <span className="badge">Kudos Message</span>
                        </div>

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value.slice(0, maxCharacters))}
                            placeholder="Describe what they did and why it matters..."
                            className="message-textarea"
                            maxLength={maxCharacters}
                        />

                        <div className="message-footer">
              <span className="character-count">
                {characterCount} / {maxCharacters} characters
              </span>
                            <button type="button" className="ai-suggestions">
                                ✨ AI Suggestions
                            </button>
                        </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="section skills-section">
                        <div className="section-header">
                            <h3>TAG SKILLS DEMONSTRATED</h3>
                            <span className="badge">Skill Tags</span>
                        </div>

                        <div className="skills-grid">
                            {allSkills.map((skill) => (
                                <button
                                    key={skill.id}
                                    type="button"
                                    className={`skill-tag ${selectedSkills.includes(skill.id) ? "selected" : ""
                                    }`}
                                    onClick={() => handleSelectSkill(skill.id)}
                                >
                                    {skill.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        Send Kudos
                    </button>
                </form>
            </div>

            {/* Sidebar - Preview and Tips */}
            <aside className="give-kudos-sidebar">
                {/* Preview Section */}
                <div className="preview-card">
                    <div className="preview-header">
                        <span className="live-badge">Live Preview</span>
                    </div>

                    <div className="preview-content">
                        <div className="preview-sender">
                            {currentSender} → {teamMembers.filter((r) => selectedRecipients.includes(r.id)).map((member) => (
                            <span>{member.name}</span>
                        )) || "Select recipients"}
                        </div>
                        <div className="preview-label">Just now</div>

                        <div className="preview-category">Leadership</div>

                        <div className="preview-message">
                            {message || "Your message will appear here..."}
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="tips-card">
                    <h4>TIPS</h4>
                    <ul className="tips-list">
                        {tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default GiveKudos;
