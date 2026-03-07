import "./GiveKudos.css";
import React from "react";
import {useEditingKudos} from "../hooks/use-editing-kudos.js";

function SelectSkillsCard() {
    const {selectedSkills, setSelectedSkills} = useEditingKudos();

    const allSkills =
        [
            {id: 1, name: "Leadership"},
            {id: 2, name: "Communication"},
            {id: 3, name: "Problem Solving"},
            {id: 4, name: "Teamwork"},
            {id: 5, name: "Creativity"},
            {id: 6, name: "Technical Excellence"},
        ];

    const handleSelectSkill = (incomingSkill) => {
        const id = incomingSkill.id;
        setSelectedSkills((prev) => prev.some(skill => skill.id === id) ? prev.filter(skill => skill.id !== id) : [...prev, incomingSkill]);
    };

    return (<div className="section skills-section">
        <div className="section-header">
            <h3>TAG SKILLS DEMONSTRATED</h3>
        </div>

        <div className="skills-grid">
            {allSkills.map((skill) => (<button
                key={skill.id}
                type="button"
                className={`skill-tag ${selectedSkills.some(s => s.id === skill.id) ? "selected" : ""}`}
                onClick={() => handleSelectSkill(skill)}
            >
                {skill.name}
            </button>))}
        </div>
    </div>);
}

export default SelectSkillsCard;
