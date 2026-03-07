import React, {useState} from "react";
import "./GiveKudos.css";

function SelectSkillsCard() {
    const [selectedSkills, setSelectedSkills] = useState([]);

    const allSkills = [{id: 1, name: "Leadership"}, {id: 2, name: "Communication"}, {
        id: 3, name: "Problem Solving"
    }, {id: 4, name: "Teamwork"}, {id: 5, name: "Creativity"}, {id: 6, name: "Technical Excellence"},];

    const handleSelectSkill = (skill) => {
        setSelectedSkills((prev) => prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]);
    };

    return (<div className="section skills-section">
        <div className="section-header">
            <h3>TAG SKILLS DEMONSTRATED</h3>
        </div>

        <div className="skills-grid">
            {allSkills.map((skill) => (<button
                key={skill.id}
                type="button"
                className={`skill-tag ${selectedSkills.includes(skill.id) ? "selected" : ""}`}
                onClick={() => handleSelectSkill(skill.id)}
            >
                {skill.name}
            </button>))}
        </div>
    </div>);
}

export default SelectSkillsCard;
