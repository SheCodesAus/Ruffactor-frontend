import "./EditKudos.css";
import React from "react";
import { useEditingKudos } from "../context/EditingKudosContext.jsx";

function SelectSkillsCard() {
  const {
    allSkills,
    selectedSkills,
    setSelectedSkills,
    skillsError,
    setSkillsError,
  } = useEditingKudos();
  const skillCount = selectedSkills.length;
  const maxSkills = 5;
  const handleSelectSkill = (incomingSkill) => {
    const id = incomingSkill.id;
    setSelectedSkills((prev) =>
      prev.some((skill) => skill.id === id)
        ? prev.filter((skill) => skill.id !== id)
        : prev.length < maxSkills
          ? [...prev, incomingSkill]
          : prev,
    );
    setSkillsError("");
  };

  return (
    <div className="section skills-section">
      <div className="section-header">
        <h3>TAG SKILLS DEMONSTRATED</h3>
        <div className="skills-footer">
          <span className="skills-count">
            {skillCount} / {maxSkills} skills
          </span>
        </div>
      </div>

      <div className="skills-grid">
        {allSkills.map((skill) => (
          <button
            key={skill.id}
            type="button"
            className={`skill-tag ${selectedSkills.some((s) => s.id === skill.id) ? "selected" : ""}`}
            onClick={() => handleSelectSkill(skill)}
          >
            {skill.name}
          </button>
        ))}
      </div>

      {skillsError && <p className="error">{skillsError}</p>}
    </div>
  );
}

export default SelectSkillsCard;
