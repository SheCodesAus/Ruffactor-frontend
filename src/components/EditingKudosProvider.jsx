import {useState} from "react";
import {EditingKudosContext as EditingKudosContext1} from "../context/EditingKudosContext.jsx";

export const EditingKudosProvider = (props) => {
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [editingKudos, setEditingKudos] = useState({
        selectedRecipients: [],
        message: "",
        selectedSkills: []
    });
    return (
        <EditingKudosContext1 value={{selectedRecipients, setSelectedRecipients,editingKudos, setEditingKudos}}>
            {props.children}
        </EditingKudosContext1>
    );
};