import React from "react";
import {useParams} from "react-router-dom";
import {EditingKudosProvider} from "../context/EditingKudosContext.jsx";
import EditingKudosForm from "../components/EditingKudosForm.jsx";

function UpdateKudos() {
    const {updatingKudosId} = useParams();

    return (
        <EditingKudosProvider updatingKudosId={updatingKudosId}>
            <EditingKudosForm/>
        </EditingKudosProvider>
    );
}

export default UpdateKudos;