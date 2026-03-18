import React from "react";
import GiveKudosMain from "../components/GiveKudosMain.jsx";
import GiveKudosSide from "../components/GiveKudosSide.jsx";
import {EditingKudosProvider} from "../context/EditingKudosContext.jsx";
import "../components/GiveKudos.css";


function GiveKudos() {
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
