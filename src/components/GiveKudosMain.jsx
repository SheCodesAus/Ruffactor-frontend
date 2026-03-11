import SelectRecipientsCard from "../components/SelectRecipientsCard.jsx";
import EditKudosMessageCard from "../components/EditKudosMessageCard.jsx";
import SelectSkillsCard from "../components/SelectSkillsCard.jsx";
import SetMediaAndLinkCard from "../components/SetMediaAndLinkCard.jsx";
import SetVisibilityCard from "../components/SetVisibilityCard.jsx";
import React from "react";

function GiveKudosMain() {
    return (
        <div className="give-kudos-main">
            <div className="give-kudos-header">
                <h1>Give Kudos</h1>
            </div>

            <form className="give-kudos-form">
                <SelectRecipientsCard/>
                <EditKudosMessageCard/>
                <SelectSkillsCard/>
                <SetMediaAndLinkCard/>
                <SetVisibilityCard/>
                <button type="submit" className="primary-button">
                    Send Kudos
                </button>
            </form>
        </div>
    );
}

export default GiveKudosMain;
