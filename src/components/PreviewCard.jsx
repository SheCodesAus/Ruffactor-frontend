import "./EditKudos.css";
import React from "react";
import {useEditingKudos} from "../context/EditingKudosContext.jsx";
import {getFullName, getInitials} from "./utility.js";

function PreviewCard() {
    const {
        selfProfile,
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
                        key={selfProfile?.id}
                        className="recipient selected">
                        <div className="avatar">{getInitials(selfProfile?.first_name, selfProfile?.last_name)}</div>
                        <span>{getFullName(selfProfile?.first_name, selfProfile?.last_name)}</span>
                    </span>
                    ↓
                    <div className="recipients-grid">
                        {selectedRecipients.map((recipient) => (
                            <span
                                key={recipient.id}
                                className="recipient selected">
                                <div className="avatar">{getInitials(recipient.first_name, recipient.last_name)}</div>
                                <span>{getFullName(recipient.first_name, recipient.last_name)}</span>
                            </span>))}
                    </div>
                </div>

                <div className="preview-skill">
                    <div className="skills-grid">
                        {selectedSkills.map((skill) => (
                            <span
                                key={skill.id}
                                className="skill-tag selected"
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
                        <div className="image-preview fix-width" aria-hidden="true"><img src={mediaImage}
                                                                                         alt="Kudos image"/>
                        </div>
                    </div>) : null}

                {mediaLink ? (<div className="preview-link">
                    <div className="link-preview fix-width" aria-hidden="true">
                        <a className="truncate-multiline" href={mediaLink} target="_blank"
                           rel="noopener noreferrer">{mediaLink}</a>
                    </div>
                </div>) : null}
            </div>
        </div>
    );
}

export default PreviewCard;
