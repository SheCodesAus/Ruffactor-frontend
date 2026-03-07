import "./GiveKudos.css";
import React from "react";

function TipsCard() {
    const tips = [
        "Be specific about what they did",
        "Explain the impact on the team",
        "Tag relevant skills",
        "Keep it genuine and personal",
    ];

    return (<div className="tips-card">
        <h4>TIPS</h4>
        <ul className="tips-list">
            {tips.map((tip, index) => (<li key={index}>{tip}</li>))}
        </ul>
    </div>);
}

export default TipsCard;
