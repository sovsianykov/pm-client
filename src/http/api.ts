import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Extend InternalAxiosRequestConfig to include _retry flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const $api = axios.create({
    baseURL: "http://localhost:8080/api/",
    withCredentials: true,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

/** Add access token to every request */
$api.interceptors.request.use((config: CustomAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('request token', token);
    return config;
});

/** Handle 401 errors and auto-refresh token */
$api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                console.warn("No refresh token found, redirecting to login");
                window.location.href = "/login";
                return Promise.reject(error);
            }

            // Request new tokens from API
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/refresh`,
                { refreshToken },
                { withCredentials: true }
            );

            // Save new tokens to localStorage
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            // Retry original request with new access token
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return $api(originalRequest);
        } catch (refreshError) {
            console.error("Failed to refresh token, redirecting to login");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
            return Promise.reject(refreshError);
        }
    }
);

export default $api;