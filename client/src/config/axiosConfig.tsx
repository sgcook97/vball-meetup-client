import axios from "axios";
import { toast } from 'react-toastify';
import { AuthContext } from "../services/AuthContext";
import { useContext } from "react";

const useApi = () => {
    const authContext = useContext(AuthContext);

    const api = axios.create({
        baseURL: import.meta.env.VITE_BLOCKPARTY_API_URL,
    });

    api.interceptors.request.use(
        config => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                const token = user.accessToken;
                if (token) {
                    config.headers["x-access-token"] = token;
                }
            }
            return config;
        },
        error => Promise.reject(error)
    );

    api.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    await authContext?.refreshToken();
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                        const user = JSON.parse(storedUser);
                        const token = user.accessToken;
                        axios.defaults.headers.common["x-access-token"] = token;
                        return api(originalRequest);
                    }
                } catch (err) {
                    toast.error("Session expired, please log in again");
                    authContext?.logout();
                }
            }
            return Promise.reject(error);
        }
    );

    return api;
};

export default useApi;