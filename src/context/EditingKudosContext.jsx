import { createContext, useContext, useEffect, useState } from "react";
import useSkills from "../hook/use-skills.js";
import useSelfProfile from "../hook/use-self-profile.js";
import useKudos from "../hook/use-kudos.js";
import useUsers from "../hook/use-users.js";

const EditingKudosContext = createContext(null);

export const useEditingKudos = () => {
  return useContext(EditingKudosContext);
};

export const EditingKudosProvider = ({ children, updatingKudosId }) => {
  const { kudos, kudosIsLoading, kudosError } = useKudos(updatingKudosId);
  const { selfProfile, selfProfileIsLoading, selfProfileError } =
    useSelfProfile();
  const { allSkills, allSkillsIsLoading, allSkillsError } = useSkills();
  const { users, usersIsLoading, usersError } = useUsers();
  const [tips] = useState([
    "Be specific about what they did",
    "Explain the impact on the team",
    "Tag relevant skills",
    "Keep it genuine and personal",
  ]);
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
        kudos,
        kudosIsLoading,
        kudosError,
        selfProfile,
        selfProfileIsLoading,
        selfProfileError,
        users,
        usersIsLoading,
        usersError,
        allSkills,
        allSkillsIsLoading,
        allSkillsError,
        tips,
        selectedRecipients,
        setSelectedRecipients,
        recipientsError,
        setRecipientsError,
        message,
        setMessage,
        messageError,
        setMessageError,
        selectedSkills,
        setSelectedSkills,
        skillsError,
        setSkillsError,
        mediaImage,
        setMediaImage,
        mediaLink,
        setMediaLink,
        visibility,
        setVisibility,
      }}
    >
      {children}
    </EditingKudosContext.Provider>
  );
};
