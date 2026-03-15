import React from "react";
import {useEditingKudos} from "../context/EditingKudosContext.jsx";
import GiveKudosMain from "./GiveKudosMain.jsx";
import GiveKudosSide from "./GiveKudosSide.jsx";

function EditingKudosForm() {
    const {
        kudosIsLoading, kudosError,
    } = useEditingKudos();

    return (
        <div>
            {
                kudosIsLoading ? (<h1>Loading...</h1>) :
                    (kudosError ? (<h3>{kudosError.message}</h3>) :
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
