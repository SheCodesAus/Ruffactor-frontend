import SelectRecipientsCard from "../components/SelectRecipientsCard.jsx";
import EditKudosMessageCard from "../components/EditKudosMessageCard.jsx";
import SelectSkillsCard from "../components/SelectSkillsCard.jsx";
import SetMediaAndLinkCard from "../components/SetMediaAndLinkCard.jsx";
import SetVisibilityCard from "../components/SetVisibilityCard.jsx";
import React,{useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useEditingKudos} from "../context/EditingKudosContext.jsx";

function GiveKudosMain() {
    const {
        selectedRecipients,
        message,
        selectedSkills,
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
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        openDialog();
        // postCreateKudos(
        //     selectedRecipients,
        //     message,
        //     selectedSkills,
        //     mediaImage,
        //     mediaLink,
        //     visibility
        // ).then(() => navigate("/"));
    };

    useEffect(() => {
        const onCancel = (ev) => {
            // for <dialog> cancel events (Esc), we still route home
            ev.preventDefault();
            navigate("/");
            requestAnimationFrame(() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            });
        };
        const dlg = dialogRef.current;
        dlg?.addEventListener("cancel", onCancel);
        return () => dlg?.removeEventListener("cancel", onCancel);
    }, [navigate]);

    return (
        <div className="give-kudos-main">
            <div className="give-kudos-header">
                <h1>Give Kudos</h1>
            </div>

            <form className="give-kudos-form" onSubmit={handleSubmit}>
                <SelectRecipientsCard/>
                <EditKudosMessageCard/>
                <SelectSkillsCard/>
                <SetMediaAndLinkCard/>
                <SetVisibilityCard/>
                <button type="submit" className="primary-button">
                    Send Kudos
                </button>
            </form>

            <dialog ref={dialogRef} className="kudos-dialog">
                <p style={{ marginBottom: 16 }}>Kudos created</p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button onClick={handleOk} autoFocus>OK</button>
                </div>
            </dialog>
        </div>
    );
}

export default GiveKudosMain;
