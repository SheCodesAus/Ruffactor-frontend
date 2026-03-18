import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SuccessToast from "./SuccessToast.jsx";
import SelectRecipientsCard from "../components/SelectRecipientsCard.jsx";
import EditKudosMessageCard from "../components/EditKudosMessageCard.jsx";
import SelectSkillsCard from "../components/SelectSkillsCard.jsx";
// import SetMediaAndLinkCard from "../components/SetMediaAndLinkCard.jsx";
import SetVisibilityCard from "../components/SetVisibilityCard.jsx";
import { useEditingKudos } from "../context/EditingKudosContext.jsx";


function GiveKudosMain() {
  const {
    selectedRecipients,
    setRecipientsError,
    message,
    setMessageError,
    selectedSkills,
    setSkillsError,
    mediaImage,
    mediaLink,
    visibility,
  } = useEditingKudos();

  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const re =
      selectedRecipients.length > 0
        ? ""
        : "Please select at least one recipient!";
    const me = message.trim() ? "" : "Please add a message!";
    const se =
      selectedSkills.length > 0 ? "" : "Please select at least one skill!";

    const allGood = re.length === 0 && me.length === 0 && se.length === 0;

    setRecipientsError(re);
    setMessageError(me);
    setSkillsError(se);

    if (allGood) {
      // Later replace this with your real API call success:
      // await postCreateKudos(...)
      setShowToast(true);

      setTimeout(() => {
        navigate("/");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 1800);
    }
  };

  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showToast]);

  const recipientName =
    selectedRecipients?.length > 0
      ? selectedRecipients[0]?.name || selectedRecipients[0]?.fullName || "your teammate"
      : "your teammate";

  return (
    <div className="give-kudos-main">
      <div className="give-kudos-header">
        <h1>Give Kudos</h1>
      </div>

      <form className="give-kudos-form" onSubmit={handleSubmit}>
        <SelectRecipientsCard />
        <EditKudosMessageCard />
        <SelectSkillsCard />
        {/* <SetMediaAndLinkCard /> */}
        <SetVisibilityCard />

        <button type="submit" className="primary-button">
          Send Kudos
        </button>
      </form>

      <SuccessToast
        show={showToast}
        onClose={() => setShowToast(false)}
        recipient={recipientName}
      />
      <SuccessToast
  show={showToast}
  onClose={() => setShowToast(false)}
  recipient={recipientName}
/>

    </div>
  );
}

export default GiveKudosMain;