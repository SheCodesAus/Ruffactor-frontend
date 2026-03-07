import "./GiveKudos.css";
import React from "react";

function PreviewCard() {
    return (<div className="preview-card">
        <div className="preview-header">
            <span className="live-badge">Live Preview</span>
        </div>

        <div className="preview-content">
            {/*<div className="preview-sender">*/}
            {/*    {currentSender} → {teamMembers.filter((r) => selectedRecipients.includes(r.id)).map((member) => (*/}
            {/*    <span>{member.name}</span>*/}
            {/*)) || "Select recipients"}*/}
            {/*</div>*/}
            <div className="preview-label">Just now</div>

            <div className="preview-category">Leadership</div>

            {/*<div className="preview-message">*/}
            {/*    {message || "Your message will appear here..."}*/}
            {/*</div>*/}
        </div>
    </div>);
}

export default PreviewCard;
