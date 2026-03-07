import React from "react";
import {useEditingKudos} from "../hooks/use-editing-kudos.js";
import "./GiveKudos.css";

function SelectRecipientsCard() {
    const {selectedRecipients, setSelectedRecipients} = useEditingKudos();

    const teamMembers = [
        {id: 1, name: "Maria Lopez", initial: "ML"},
        {id: 2, name: "Tom Bradley", initial: "TB"},
        {id: 3, name: "Dana Wu", initial: "DW"},
        {id: 4, name: "Chris Nguyen", initial: "CN"},
        {id: 5, name: "Sam Rivera", initial: "SR"},
        {id: 6, name: "Alex Chen", initial: "AC"},
    ];

    const handleSelectRecipient = (incomingRecipient) => {
        const id = incomingRecipient.id;
        setSelectedRecipients((prev) => prev.some(person => person.id === id) ? prev.filter(person => person.id !== id) : [...prev, incomingRecipient]);
    };

    return (<div className="section recipient-section">
        <div className="section-header">
            <h3>WHO ARE YOU RECOGNIZING?</h3>
        </div>

        <div className="team-members-grid">
            {selectedRecipients.map((member) => (<button
                key={member.id}
                type="button"
                className={`team-member selected`}
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

        <div className="team-members-grid">
            {teamMembers.map((member) => (<button
                key={member.id}
                type="button"
                className={`team-member ${selectedRecipients.some(person => person.id === member.id) ? "selected" : ""}`}
                onClick={() => handleSelectRecipient(member)}
            >
                <div className="avatar">{member.initial}</div>
                <span>{member.name}</span>
            </button>))}
        </div>
    </div>);
}

export default SelectRecipientsCard;
