import "./GiveKudos.css";
import React from "react";
import {useEditingKudos} from "../hooks/use-editing-kudos.js";

function PreviewCard() {
    const {currentSender,selectedRecipients,message,selectedSkills} = useEditingKudos();
    return (<div className="preview-card">
        <div className="preview-header">
            <span className="live-badge">Live Preview</span>
        </div>

        <div className="preview-content">
            <div className="preview-sender">
                {currentSender} → {selectedRecipients.map((member) => (
                <span key={member.id}>{member.name}</span>
            )) || "Select recipients"}
            </div>
            <div className="preview-label">Just now</div>

            <div className="preview-category">{selectedSkills.map((skill) => (
                <span key={skill.id}>{skill.name}</span>
            )) || "Select skills"}</div>

            <div className="preview-message">
                {message || "Your message will appear here..."}
            </div>
        </div>
    </div>);
}

export default PreviewCard;
