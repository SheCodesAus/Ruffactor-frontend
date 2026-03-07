import React, {useState} from "react";
import "./GiveKudos.css";

function SelectRecipientsCard() {
    const [selectedRecipients, setSelectedRecipients] = useState([1]);

    const teamMembers = [{id: 1, name: "Maria Lopez", initial: "ML"}, {
        id: 2, name: "Tom Bradley", initial: "TB"
    }, {id: 3, name: "Dana Wu", initial: "DW"}, {id: 4, name: "Chris Nguyen", initial: "CN"}, {
        id: 5, name: "Sam Rivera", initial: "SR"
    }, {id: 6, name: "Alex Chen", initial: "AC"},];

    const handleSelectRecipient = (recipient) => {
        setSelectedRecipients((prev) => prev.includes(recipient) ? prev.filter((r) => r !== recipient) : [...prev, recipient]);
    };

    return (<div className="section recipient-section">
        <div className="section-header">
            <h3>WHO ARE YOU RECOGNIZING?</h3>
        </div>

        <div className="team-members-grid">
            {teamMembers.filter((r) => selectedRecipients.includes(r.id)).map((member) => (<button
                key={member.id}
                type="button"
                className={`team-member selected`}
                onClick={() => handleSelectRecipient(member.id)}
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
                className={`team-member ${selectedRecipients.includes(member.id) ? "selected" : ""}`}
                onClick={() => handleSelectRecipient(member.id)}
            >
                <div className="avatar">{member.initial}</div>
                <span>{member.name}</span>
            </button>))}
        </div>
    </div>);
}

export default SelectRecipientsCard;
