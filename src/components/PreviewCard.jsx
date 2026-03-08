import "./GiveKudos.css";
import React from "react";
import {useEditingKudos} from "../hooks/use-editing-kudos.js";

function PreviewCard() {
    const {
        currentSender,
        selectedRecipients,
        message,
        selectedSkills,
        mediaImage,
        mediaLink,
        visibility
    } = useEditingKudos();
    return (
        <div className="section preview-section">
            <div className="section-header">
                <h3>PREVIEW</h3>
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

                {mediaImage ? (
                    <div className="preview-image">
                        <div className="image-preview" aria-hidden="true"><img src={mediaImage} alt="Kudos image"/>
                        </div>
                    </div>) : null}

                {mediaLink ? (<div className="preview-link">
                    <div className="link-preview" aria-hidden="true"><img src={mediaLink} alt="Kudos link"/>
                    </div>
                </div>) : null}

                <div className="preview-visibility">
                    {visibility}
                </div>
            </div>
        </div>
    );
}

export default PreviewCard;
