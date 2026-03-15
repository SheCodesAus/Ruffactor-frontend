import "./GiveKudos.css";
import React from "react";
import {useEditingKudos} from "../context/EditingKudosContext.jsx";

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

    const getInitials = (firstName, lastName) => {
        if (!firstName || !lastName) {
            return "";
        }

        // Get the first character of each name and convert to uppercase
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName.charAt(0).toUpperCase();

        return `${firstInitial}${lastInitial}`;
    };

    const getFullName = (firstName, lastName) => {
        if (!firstName || !lastName) {
            return "";
        }
        return `${firstName} ${lastName}`;
    };

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
                        <div className="avatar">{getInitials(selfProfile?.first_name,selfProfile?.last_name)}</div>
                        <span>{getFullName(selfProfile?.first_name,selfProfile?.last_name)}</span>
                    </span>
                    ↓
                    <div className="recipients-grid">
                        {selectedRecipients.map((recipient) => (
                            <span
                                key={recipient.id}
                                className="recipient selected">
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
