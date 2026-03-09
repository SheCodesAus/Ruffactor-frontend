import "./GiveKudos.css";
import React from "react";
import {useEditingKudos} from "../context/EditingKudosContext.jsx";

function TipsCard() {
    const {tips} = useEditingKudos();
    return (<div className="section tips-section">
        <div className="section-header">
            <h3>TIPS</h3>
        </div>
        <ul className="tips-list">
            {tips.map((tip, index) => (<li key={index}>{tip}</li>))}
        </ul>
    </div>);
}

export default TipsCard;
