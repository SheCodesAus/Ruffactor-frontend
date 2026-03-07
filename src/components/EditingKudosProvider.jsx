import {useState} from "react";
import {EditingKudosContext as EditingKudosContext1} from "./EditingKudosContext.jsx";

export const EditingKudosProvider = (props) => {
    const [editingKudos, setEditingKudos] = useState({
        selectedRecipients: [],
        message:""
    });
    return (
        <EditingKudosContext1 value={{editingKudos, setEditingKudos}}>
            {props.children}
        </EditingKudosContext1>
    );
};