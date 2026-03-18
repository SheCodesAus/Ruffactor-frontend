import React from "react";
import {useEditingKudos} from "../context/EditingKudosContext.jsx";
import "./GiveKudos.css";
import {getFullName, getInitials} from "./utility.js";

function SelectRecipientsCard() {
    const {
        users,
        selectedRecipients,
        setSelectedRecipients,
        recipientsError,
        setRecipientsError
    } = useEditingKudos();
    const recipientCount = selectedRecipients.length;
    const maxRecipients = 5;

    const handleSelectRecipient = (incomingRecipient) => {
        const id = incomingRecipient.id;
        setSelectedRecipients((prev) => prev.some(person => person.id === id) ? prev.filter(person => person.id !== id) : (prev.length < maxRecipients ? [...prev, incomingRecipient] : prev));
        setRecipientsError("");
    };

    return (
        <div className="section recipient-section">
            <div className="section-header">
                <h3>WHO ARE YOU RECOGNIZING?</h3>
                <div className="recipients-footer">
                    <span className="recipients-count">
                        {recipientCount} / {maxRecipients} recipients
                    </span>
                </div>
            </div>

            {/*<div className="recipients-grid">*/}
            {/*    {selectedRecipients.map((member) => (<button*/}
            {/*        key={member.id}*/}
            {/*        type="button"*/}
            {/*        className="recipient selected"*/}
            {/*        onClick={() => handleSelectRecipient(member)}*/}
            {/*    >*/}
            {/*        <div className="avatar">{getInitials(member.first_name, member.last_name)}</div>*/}
            {/*        <span>{getFullName(member.first_name, member.last_name)}</span>*/}
            {/*    </button>))}*/}
            {/*</div>*/}

            {/*<input*/}
            {/*    type="text"*/}
            {/*    placeholder="Search team members..."*/}
            {/*    className="search-input"*/}
            {/*/>*/}

            <div className="recipients-grid">
                {users.map((member) => (<button
                    key={member.id}
                    type="button"
                    className={`recipient ${selectedRecipients.some(person => person.id === member.id) ? "selected" : ""}`}
                    onClick={() => handleSelectRecipient(member)}
                >
                    <div className="avatar">{getInitials(member.first_name, member.last_name)}</div>
                    <span>{getFullName(member.first_name, member.last_name)}</span>
                </button>))}
            </div>

            {recipientsError && <p className="error">{recipientsError}</p>}
        </div>
    );
}

export default SelectRecipientsCard;
