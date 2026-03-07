import {useContext} from "react";

import {EditingKudosContext} from "../context/EditingKudosContext.jsx";

export const useEditingKudos = () => {
    return useContext(EditingKudosContext);
};