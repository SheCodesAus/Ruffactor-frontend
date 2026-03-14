import {useState, useEffect} from "react";

import getSkills from "../api/get-get-skills.js";

export default function useSkills() {
    const [allSkills, setAllSkills] = useState([]);
    const [allSkillsIsLoading, setAllSkillsIsLoading] = useState(true);
    const [allSkillsError, setAllSkillsError] = useState();
    useEffect(() => {
        getSkills()
            .then((skillsResponse) => {
                setAllSkills(skillsResponse.results);
                setAllSkillsIsLoading(false);
            })
            .catch((error) => {
                setAllSkillsError(error);
                setAllSkillsIsLoading(false);
            });
    }, []);
    return {allSkills, allSkillsIsLoading, allSkillsError};
}