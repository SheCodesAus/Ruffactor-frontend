import {useState} from "react";
import EditingKudosContext from "../context/EditingKudosContext.jsx";

export const EditingKudosProvider = (props) => {
    const [currentSender] = useState({id: 7, name: "Jordan Diesel", initial: "JD"},);
    const [teamMembers] = useState([
        {id: 1, name: "Maria Lopez", initial: "ML"},
        {id: 2, name: "Tom Bradley", initial: "TB"},
        {id: 3, name: "Dana Wu", initial: "DW"},
        {id: 4, name: "Chris Nguyen", initial: "CN"},
        {id: 5, name: "Sam Rivera", initial: "SR"},
        {id: 6, name: "Alex Chen", initial: "AC"},
    ]);
    const [allSkills] = useState([
        {id: 1, name: "Leadership"},
        {id: 2, name: "Communication"},
        {id: 3, name: "Problem Solving"},
        {id: 4, name: "Teamwork"},
        {id: 5, name: "Creativity"},
        {id: 6, name: "Technical Excellence"},
    ]);
    const [tips] = useState([
        "Be specific about what they did",
        "Explain the impact on the team",
        "Tag relevant skills",
        "Keep it genuine and personal",
    ]);
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
                teamMembers,
                allSkills,
                tips,
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