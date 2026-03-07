import React, {useState} from "react";
import GiveKudosMain from "../components/GiveKudosMain.jsx";
import GiveKudosSide from "../components/GiveKudosSide.jsx";
import {EditingKudosProvider} from "../components/EditingKudosProvider.jsx";
import "../components/GiveKudos.css";

function GiveKudos() {
    const [currentSender] = useState("Jordan");

    return (
        <EditingKudosProvider>
            <div className="give-kudos-container">
                <GiveKudosMain/>
                <GiveKudosSide/>
            </div>
        </EditingKudosProvider>
    );
}

export default GiveKudos;
