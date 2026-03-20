import {useState, useEffect} from "react";

import getGetSelfProfile from "../api/get-get-self-profile.js";
import {useAuth} from "../context/AuthContext.jsx";

export default function useSelfProfile() {
    const {isLoggedIn, token, user} = useAuth();
    const [selfProfile, setSelfProfile] = useState();
    const [selfProfileIsLoading, setSelfProfileIsLoading] = useState(true);
    const [selfProfileError, setSelfProfileError] = useState();
    useEffect(() => {
        getGetSelfProfile(token)
            .then((selfProfileResponse) => {
                console.log(selfProfileResponse);
                setSelfProfile(selfProfileResponse);
                setSelfProfileIsLoading(false);
            })
            .catch((error) => {
                setSelfProfileError(error);
                setSelfProfileIsLoading(false);
            });
    }, []);
    return {selfProfile, selfProfileIsLoading, selfProfileError};
}