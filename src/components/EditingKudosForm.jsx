import React from "react";
import {useEditingKudos} from "../context/EditingKudosContext.jsx";
import GiveKudosMain from "./GiveKudosMain.jsx";
import GiveKudosSide from "./GiveKudosSide.jsx";

function EditingKudosForm() {
    const {
        updatingKudosIsLoading, updatingKudosError,
    } = useEditingKudos();

    return (
        <div>
            {
                updatingKudosIsLoading ? (<h1>Loading...</h1>) :
                    (updatingKudosError ? (<h3>{updatingKudosError.message}</h3>) :
                            (
                                <div className="give-kudos-container">
                                    <GiveKudosMain/>
                                    <GiveKudosSide/>
                                </div>
                            )
                    )
            }
        </div>
    );
}

export default EditingKudosForm;
