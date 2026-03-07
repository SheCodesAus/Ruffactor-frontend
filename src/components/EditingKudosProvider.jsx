import {useState} from "react";
import EditingKudosContext from "../context/EditingKudosContext.jsx";

export const EditingKudosProvider = (props) => {
    const [currentSender] = useState("Jordan");
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [visibility, setVisibility] = useState("public");

    return (
        <EditingKudosContext
            value={{currentSender,
                selectedRecipients, setSelectedRecipients,
                message, setMessage,
                selectedSkills, setSelectedSkills,
                visibility, setVisibility}}>
            {props.children}
        </EditingKudosContext>
    );
};