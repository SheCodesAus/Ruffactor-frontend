import {useState} from "react";
import EditingKudosContext from "../context/EditingKudosContext.jsx";

export const EditingKudosProvider = (props) => {
    const [currentSender] = useState("Jordan");
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);

    return (
        <EditingKudosContext
            value={{currentSender,selectedRecipients, setSelectedRecipients, message, setMessage, selectedSkills, setSelectedSkills}}>
            {props.children}
        </EditingKudosContext>
    );
};