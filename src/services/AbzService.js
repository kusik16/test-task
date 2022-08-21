import { useHttp } from "../hooks/http.hook";
import { useState } from "react";

const useAbzService = () => {
    const { request, clearError, process, setProcess } = useHttp();
    const [token, setToken] = useState("");

    const _apiBase = "https://frontend-test-assignment-api.abz.agency/api/v1/",
        _baseCount = 6,
        _basePage = 1;

    const getAllUsers = async (page = _basePage, count = _baseCount) => {
        const res = await request(
            `${_apiBase}users?page=${page}&count=${count}`
        );
        return {
            totalPages: res.total_pages,
            users: res.users.sort(
                (a, b) => b.registration_timestamp - a.registration_timestamp
            ),
        };
    };

    const getAllPositions = async () => {
        const res = await request(`${_apiBase}positions`);
        return res.positions;
    };

    const generateToken = async () => {
        const res = await request(`${_apiBase}token`);
        setToken(res.token);
        return res.token;
    };

    const createUser = async (user, apiToken = token) => {
        const res = await request(`${_apiBase}users`, "POST", user, {
            Token: apiToken,
        });
        return res;
    };

    return {
        clearError,
        process,
        setProcess,
        getAllUsers,
        createUser,
        generateToken,
        getAllPositions,
    };
};

export default useAbzService;
