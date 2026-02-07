import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";
import { useAuthErrorStore } from "@/stores/useAuthErrorStore";

const BASE_URL = "/api";
const isServer = typeof window === "undefined";

const flattenParams = (
    obj: Record<string, unknown>,
    prefix = "",
): Array<[string, string]> => {
    const result: Array<[string, string]> = [];

    Object.entries(obj).forEach(([key, value]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (value === undefined) {
            return;
        }

        if (value === null) {
            result.push([newKey, ""]);
            return;
        }

        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                if (typeof item === "object" && item !== null) {
                    result.push(
                        ...flattenParams(
                            item as Record<string, unknown>,
                            `${newKey}.${index}`,
                        ),
                    );
                } else {
                    result.push([`${newKey}.${index}`, String(item)]);
                }
            });
        } else if (typeof value === "object") {
            result.push(
                ...flattenParams(value as Record<string, unknown>, newKey),
            );
        } else {
            result.push([newKey, String(value)]);
        }
    });

    return result;
};

const axiosClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
    paramsSerializer: {
        serialize: (params) => {
            const searchParams = new URLSearchParams();
            flattenParams(params).forEach(([key, value]) => {
                searchParams.append(key, value);
            });
            return searchParams.toString();
        },
    },
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
            useAuthErrorStore.getState().showAuthError();
        }
        return Promise.reject(error);
    },
);

const axiosServer: AxiosInstance = axios.create({
    baseURL: isServer ? process.env.NEXT_PUBLIC_API_BASE_URL : BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

// 디버깅용 - 배포 후 서버 로그에서 확인 TODO:삭제
axiosServer.interceptors.request.use(
    (config) => {
        console.log(
            "[DEBUG] axiosServer request URL:",
            config.baseURL,
            config.url,
        );
        console.log("[DEBUG] Full URL:", `${config.baseURL}${config.url}`);
        return config;
    },
    (error) => Promise.reject(error),
);

// 디버깅용 - 배포 후 서버 로그에서 확인 TODO:삭제
if (isServer) {
    console.log(
        "[DEBUG] NEXT_PUBLIC_API_BASE_URL:",
        process.env.NEXT_PUBLIC_API_BASE_URL,
    );
}

export { axiosClient, axiosServer };
