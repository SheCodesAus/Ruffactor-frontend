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

                <div className="preview-misc">
                    <span>Just Now</span> <span>{visibility}</span>
                </div>

                <div className="preview-sender-recipients">
                    <span
                        key={currentSender.id}
                        className="recipient">
                        <div className="avatar">{currentSender.initial}</div>
                        <span>{currentSender.name}</span>
                    </span>
                    ↓
                    <div className="recipients-grid">
                        {selectedRecipients.map((recipient) => (
                            <span
                                key={recipient.id}
                                className="recipient">
                                <div className="avatar">{recipient.initial}</div>
                                <span>{recipient.name}</span>
                            </span>))}
                    </div>
                </div>

                <div className="preview-skill">
                    <div className="skills-grid">
                        {selectedSkills.map((skill) => (
                            <span
                                key={skill.id}
                                className={`skill-tag`}
                            >
                                {skill.name}
                            </span>))}
                    </div>
                </div>

                <div className="preview-message">
                    {message || "Your message will appear here..."}
                </div>

                {mediaImage ? (
                    <div className="preview-image">
                        <div className="image-preview fix-width" aria-hidden="true"><img src={mediaImage} alt="Kudos image"/>
                        </div>
                    </div>) : null}

                {mediaLink ? (<div className="preview-link">
                    <div className="link-preview fix-width" aria-hidden="true"><img src={mediaLink} alt="Kudos link"/>
                    </div>
                </div>) : null}
            </div>
        </div>
    );
}

export default PreviewCard;
