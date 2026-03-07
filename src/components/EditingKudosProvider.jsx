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
    const [tips] = useState([
        "Be specific about what they did",
        "Explain the impact on the team",
        "Tag relevant skills",
        "Keep it genuine and personal",
    ]);

    return (
        <EditingKudosContext
            value={{
                currentSender,
                selectedRecipients, setSelectedRecipients,
                message, setMessage,
                selectedSkills, setSelectedSkills,
                mediaImage, setMediaImage,
                mediaLink, setMediaLink,
                visibility, setVisibility,
                tips
            }}>
            {props.children}
        </EditingKudosContext>
    );
};