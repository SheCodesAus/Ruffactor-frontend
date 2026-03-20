import {useState, useEffect} from "react";
import getGetSkills from "../api/get-get-skills.js";
import {useAuth} from "../context/AuthContext.jsx";

export default function useSkills() {
    const {isLoggedIn, token, user} = useAuth();
    const [allSkills, setAllSkills] = useState([]);
    const [allSkillsIsLoading, setAllSkillsIsLoading] = useState(true);
    const [allSkillsError, setAllSkillsError] = useState();
    useEffect(() => {
        getGetSkills(token)
            .then((skillsResponse) => {
                console.log(skillsResponse);
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