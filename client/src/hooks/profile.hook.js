import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "./http.hook";

export const useProfile = () => {
    const {req} = useHttp();
    const {userId, token} = useContext(AuthContext);
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await req(`/api/profile/${userId}`, 'POST', null, {Authorization: token});
                setUser(data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchUser()
    }, [userId]);
    return user;
};