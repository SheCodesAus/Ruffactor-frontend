import React from "react";
import "./GiveKudos.css";
import {useEditingKudos} from "../context/EditingKudosContext.jsx";

function EditKudosMessageCard() {
    const {message, setMessage} = useEditingKudos();
    const characterCount = message.length;
    const maxCharacters = 500;

    return (<div className="section message-section">
        <div className="section-header">
            <h3>YOUR MESSAGE</h3>
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
    </div>);
}

export default EditKudosMessageCard;
