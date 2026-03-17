import React from "react";
import {useEditingKudos} from "../context/EditingKudosContext.jsx";
import EditKudosMain from "./EditKudosMain.jsx";
import EditKudosSide from "./EditKudosSide.jsx";

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
                                    <EditKudosMain/>
                                    <EditKudosSide/>
                                </div>
                            )
                    )
            }
        </div>
    );
}

export default EditingKudosForm;
