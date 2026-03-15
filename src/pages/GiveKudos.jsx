import React from "react";
import {EditingKudosProvider} from "../context/EditingKudosContext.jsx";
import "../components/GiveKudos.css";
import EditingKudosForm from "../components/EditingKudosForm.jsx";

function GiveKudos() {
    return (
        <EditingKudosProvider>
            <EditingKudosForm/>
        </EditingKudosProvider>
    );
}

export default GiveKudos;
