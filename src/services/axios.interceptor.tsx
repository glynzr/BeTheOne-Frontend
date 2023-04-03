import axios from "axios";
import { appCheck } from "./fire_app";
import { getToken } from "firebase/app-check";
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
    try {
        config.headers["X-Firebase-AppCheck"] = (
            await getToken(appCheck, true)
        ).token; // send appCheck secure generated token

        return config;
    } catch (error) {
        throw error;
    }
});

export default axiosInstance;
