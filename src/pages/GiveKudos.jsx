import React, {useState} from "react";
import GiveKudosMain from "../components/GiveKudosMain.jsx";
import GiveKudosSide from "../components/GiveKudosSide.jsx";
import "../components/GiveKudos.css";

function GiveKudos() {
    const [currentSender] = useState("Jordan");

    return (
        <div className="give-kudos-container">
            <GiveKudosMain/>
            <GiveKudosSide/>
        </div>
    );
}

export default GiveKudos;
