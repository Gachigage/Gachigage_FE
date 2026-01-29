import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";

const BASE_URL = "/api";

const axiosClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

// 요청 인터셉터
axiosClient.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// 401 에러 처리
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

const axiosServer: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

export { axiosClient, axiosServer };
