import React from "react";
import {useEditingKudos} from "../hooks/use-editing-kudos.js";
import "./GiveKudos.css";

function SelectRecipientsCard() {
    const {teamMembers, selectedRecipients, setSelectedRecipients} = useEditingKudos();

    const handleSelectRecipient = (incomingRecipient) => {
        const id = incomingRecipient.id;
        setSelectedRecipients((prev) => prev.some(person => person.id === id) ? prev.filter(person => person.id !== id) : [...prev, incomingRecipient]);
    };

    return (
        <div className="section recipient-section">
            <div className="section-header">
                <h3>WHO ARE YOU RECOGNIZING?</h3>
            </div>

            <div className="recipients-grid">
                {selectedRecipients.map((member) => (<button
                    key={member.id}
                    type="button"
                    className="recipient selected"
                    onClick={() => handleSelectRecipient(member)}
                >
                    <div className="avatar">{member.initial}</div>
                    <span>{member.name}</span>
                </button>))}
            </div>

            <input
                type="text"
                placeholder="Search team members..."
                className="search-input"
            />

            <div className="recipients-grid">
                {teamMembers.map((member) => (<button
                    key={member.id}
                    type="button"
                    className={`recipient ${selectedRecipients.some(person => person.id === member.id) ? "selected" : ""}`}
                    onClick={() => handleSelectRecipient(member)}
                >
                    <div className="avatar">{member.initial}</div>
                    <span>{member.name}</span>
                </button>))}
            </div>
        </div>
    );
}

export default SelectRecipientsCard;
