import {useState, useEffect} from "react";
import getGetKudosById from "../api/get-get-kudos-by-id.js";

export default function useKudos(kudosId) {
    const [kudos, setKudos] = useState();
    const [kudosIsLoading, setKudosIsLoading] = useState(true);
    const [kudosError, setKudosError] = useState();

    useEffect(() => {
        if (kudosId !== null) {
            getGetKudosById(kudosId)
                .then((kudosResponse) => {
                    console.log(kudosResponse);
                    setKudos(kudosResponse);
                    setKudosIsLoading(false);
                })
                .catch((error) => {
                    setKudosError(error);
                    setKudosIsLoading(false);
                });

        } else {
            setTimeout(() => {
                setKudos(null);
                setKudosIsLoading(false);
            });
        }
    }, [kudosId]);
    return {kudos, kudosIsLoading, kudosError};
}