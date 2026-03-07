import "./GiveKudos.css";
import React from "react";
import {useEditingKudos} from "../hooks/use-editing-kudos.js";

function TipsCard() {
    const {tips} = useEditingKudos();
    return (<div className="tips-card">
        <h4>TIPS</h4>
        <ul className="tips-list">
            {tips.map((tip, index) => (<li key={index}>{tip}</li>))}
        </ul>
    </div>);
}

export default TipsCard;
