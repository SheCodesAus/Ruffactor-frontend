import {useState} from "react";
import EditingKudosContext from "../context/EditingKudosContext.jsx";

export const EditingKudosProvider = (props) => {
    const [currentSender] = useState("Jordan");
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [visibility, setVisibility] = useState("public");
    const [mediaImage, setMediaImage] = useState("");
    const [mediaLink, setMediaLink] = useState("");

    return (
        <EditingKudosContext
            value={{
                currentSender,
                selectedRecipients, setSelectedRecipients,
                message, setMessage,
                selectedSkills, setSelectedSkills,
                mediaImage, setMediaImage,
                mediaLink, setMediaLink,
                visibility, setVisibility
            }}>
            {props.children}
        </EditingKudosContext>
    );
};