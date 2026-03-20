import {useState, useEffect} from "react";

import getGetSelfProfile from "../api/get-get-self-profile.js";

export default function useSelfProfile() {
    const [selfProfile, setSelfProfile] = useState();
    const [selfProfileIsLoading, setSelfProfileIsLoading] = useState(true);
    const [selfProfileError, setSelfProfileError] = useState();
    useEffect(() => {
        getGetSelfProfile()
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