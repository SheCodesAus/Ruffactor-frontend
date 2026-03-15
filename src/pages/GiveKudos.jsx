import React from "react";
import {EditingKudosProvider} from "../context/EditingKudosContext.jsx";
import EditingKudosForm from "../components/EditingKudosForm.jsx";

function GiveKudos() {
    return (
        <EditingKudosProvider>
            <EditingKudosForm/>
        </EditingKudosProvider>
    );
}

export default GiveKudos;
