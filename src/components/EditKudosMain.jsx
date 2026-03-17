import React, {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import SelectRecipientsCard from "../components/SelectRecipientsCard.jsx";
import EditKudosMessageCard from "../components/EditKudosMessageCard.jsx";
import SelectSkillsCard from "../components/SelectSkillsCard.jsx";
import SetMediaAndLinkCard from "../components/SetMediaAndLinkCard.jsx";
import SetVisibilityCard from "../components/SetVisibilityCard.jsx";
import {useEditingKudos} from "../context/EditingKudosContext.jsx";
import postCreateKudos from "../api/post-create-kudos.js";
import patchUpdateKudos from "../api/patch-update-kudos.js";

function EditKudosMain() {
    const {
        updatingKudosId,
        selectedRecipients,
        setRecipientsError,
        message,
        setMessageError,
        selectedSkills,
        setSkillsError,
        mediaImage,
        mediaLink,
        visibility
    } = useEditingKudos();
    const navigate = useNavigate();
    const dialogRef = useRef(null);

    // Utility to open the dialog safely
    const openDialog = () => {
        const dlg = dialogRef.current;
        if (!dlg) return;

        // <dialog> needs showModal() to trap focus and show backdrop
        if (typeof dlg.showModal === "function") {
            dlg.showModal();
        } else {
            // Fallback if browser doesn’t support <dialog>
            dlg.setAttribute("open", "");
        }
    };

    const closeDialog = () => {
        const dlg = dialogRef.current;
        if (!dlg) return;
        if (dlg.open && typeof dlg.close === "function") dlg.close();
        else dlg.removeAttribute("open");
    };

    const handleOk = () => {
        closeDialog();
        navigate("/");
        requestAnimationFrame(() => {
            window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const re = selectedRecipients.length > 0 ? "" : "Please select at least one recipient!";
        const me = message.trim() ? "" : "Please add a message!";
        const se = selectedSkills.length > 0 ? "" : "Please select at least one skill!";
        const allGood = re.length === 0 && me.length === 0 && se.length === 0;
        setRecipientsError(re);
        setMessageError(me);
        setSkillsError(se);
        if (allGood) {
            if (updatingKudosId) {
                patchUpdateKudos(
                    updatingKudosId,
                    selectedRecipients,
                    message,
                    selectedSkills,
                    mediaImage,
                    mediaLink,
                    visibility
                ).then(() => openDialog());
            } else {
                postCreateKudos(
                    selectedRecipients,
                    message,
                    selectedSkills,
                    mediaImage,
                    mediaLink,
                    visibility
                ).then(() => openDialog());
            }
        }
    };

    useEffect(() => {
        const onCancel = (ev) => {
            // for <dialog> cancel events (Esc), we still route home
            ev.preventDefault();
            navigate("/");
            requestAnimationFrame(() => {
                window.scrollTo({top: 0, left: 0, behavior: "smooth"});
            });
        };
        const dlg = dialogRef.current;
        dlg?.addEventListener("cancel", onCancel);
        return () => dlg?.removeEventListener("cancel", onCancel);
    }, [navigate]);

    return (
        <div className="give-kudos-main">
            <div className="give-kudos-header">
                {updatingKudosId ? (<h1>Update Kudos</h1>) : (<h1>Give Kudos</h1>)}
            </div>

            <form className="give-kudos-form" onSubmit={handleSubmit}>
                <SelectRecipientsCard/>
                <EditKudosMessageCard/>
                <SelectSkillsCard/>
                {/*<SetMediaAndLinkCard/>*/}
                {/*<SetVisibilityCard/>*/}
                <button type="submit" className="primary-button">
                    {updatingKudosId ? ("Update Kudos") : ("Send Kudos")}
                </button>
            </form>

            <dialog ref={dialogRef} className="kudos-dialog">
                <p style={{marginBottom: 16}}>{updatingKudosId ? ("Kudos Updated.") : ("Kudos Created.")}</p>
                <div style={{display: "flex", justifyContent: "flex-end", gap: 8}}>
                    <button onClick={handleOk} autoFocus>OK</button>
                </div>
            </dialog>
        </div>
    );
}

export default EditKudosMain;
