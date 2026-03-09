import React from "react";
import "./GiveKudos.css";
import {useEditingKudos} from "../context/EditingKudosContext.jsx";

function SetVisibilityCard() {
    const {visibility, setVisibility} = useEditingKudos();
    return (<div className="section visibility-section">
        <div className="section-header">
            <h3>POST VISIBILITY</h3>
        </div>

        <div className="visibility-options">
            <label className="visibility-option">
                <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={visibility === "public"}
                    onChange={(e) => setVisibility(e.target.value)}
                />
                <span>Public (Everyone)</span>
            </label>
            <label className="visibility-option">
                <input
                    type="radio"
                    name="visibility"
                    value="team"
                    checked={visibility === "team"}
                    onChange={(e) => setVisibility(e.target.value)}
                />
                <span>Team Only</span>
            </label>
            <label className="visibility-option">
                <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={visibility === "private"}
                    onChange={(e) => setVisibility(e.target.value)}
                />
                <span>Private</span>
            </label>
        </div>
    </div>);
}

export default SetVisibilityCard;
