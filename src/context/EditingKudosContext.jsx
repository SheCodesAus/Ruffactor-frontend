import {createContext, useContext, useEffect, useState} from "react";
import useSkills from "../hook/use-skills.js";
import useSelfProfile from "../hook/use-self-profile.js";
import useKudos from "../hook/use-kudos.js";

const EditingKudosContext = createContext(null);

export const useEditingKudos = () => {
    return useContext(EditingKudosContext);
};

export const EditingKudosProvider = ({children, updatingKudosId}) => {
    const {kudos, kudosIsLoading, kudosError} = useKudos(updatingKudosId);
    // const [selfProfile] = useState({id: 8, first_name: "Jordan", last_name: "Diesel", username: "jordandisel"},);
    const {selfProfile, selfProfileIsLoading, selfProfileError} = useSelfProfile();
    // const [allSkills] = useState(
    //     [
    //         {id: 1, name: "Leadership"},
    //         {id: 2, name: "Communication"},
    //         {id: 3, name: "Problem Solving"},
    //         {id: 4, name: "Teamwork"},
    //         {id: 5, name: "Creativity"},
    //         {id: 6, name: "Technical Excellence"}
    //     ]
    // );
    const {allSkills, allSkillsIsLoading, allSkillsError} = useSkills();
    const [teamMembers] = useState(
        [
            {id: 1, name: "Maria Lopez", initial: "ML"},
            {id: 2, name: "Tom Bradley", initial: "TB"},
            {id: 3, name: "Dana Wu", initial: "DW"},
            {id: 4, name: "Chris Nguyen", initial: "CN"},
            {id: 5, name: "Sam Rivera", initial: "SR"},
            {id: 6, name: "Alex Chen", initial: "AC"},
        ]
    );
    // const [allSkills] = useState(
    //     [
    //         {id: 1, name: "Leadership"},
    //         {id: 2, name: "Communication"},
    //         {id: 3, name: "Problem Solving"},
    //         {id: 4, name: "Teamwork"},
    //         {id: 5, name: "Creativity"},
    //         {id: 6, name: "Technical Excellence"}
    //     ]
    // );
    const [tips] = useState(["Be specific about what they did", "Explain the impact on the team", "Tag relevant skills", "Keep it genuine and personal",]);
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [recipientsError, setRecipientsError] = useState("");
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skillsError, setSkillsError] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [mediaImage, setMediaImage] = useState("");
    const [mediaLink, setMediaLink] = useState("");

    useEffect(() => {
        if (kudos) {
            setTimeout(() => {
                setSelectedRecipients(kudos.recipients);
                setMessage(kudos.message);
                setSelectedSkills(kudos.skills);
                setVisibility(kudos.visibility);
            });
        }
    }, [kudos]);

    return (
        <EditingKudosContext.Provider
            value={{
                updatingKudosId,
                kudos, kudosIsLoading, kudosError,
                selfProfile, selfProfileIsLoading, selfProfileError,
                teamMembers,
                allSkills, allSkillsIsLoading, allSkillsError,
                tips,
                selectedRecipients, setSelectedRecipients,
                recipientsError, setRecipientsError,
                message, setMessage,
                messageError, setMessageError,
                selectedSkills, setSelectedSkills,
                skillsError, setSkillsError,
                mediaImage, setMediaImage,
                mediaLink, setMediaLink,
                visibility, setVisibility
            }}>
            {children}
        </EditingKudosContext.Provider>
    );
};