
"use client";
import { makeAutoObservable, runInAction } from "mobx";
import $api from "@/http/api";
import axios from "axios";
import AdminService from "@/services/AdminService";
import {IUser} from "../../types/response/user";



class AuthStore {
    user: IUser | null = null;
    users: IUser[] = [];
    accessToken: string | null = null;
    refreshToken: string | null = null;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    /** Login user and store tokens */
    async login(email: string, password: string) {
        this.isLoading = true;
        try {
            const { data } = await $api.post("/users/login", {email, password });

            runInAction(() => {
                this.user = data.user;
                this.accessToken = data.accessToken;
                this.refreshToken = data.refreshToken;
                this.isAuth = true;
                localStorage.setItem("isAuth", "true");
                localStorage.setItem("token", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
            });
        } catch (error) {
            console.error("Login error", error);
            throw error;
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    /** Register a user and store tokens */
    async register(firstName: string, lastName: string, email: string, password: string) {
        this.isLoading = true;
        try {
            const { data } = await $api.post("/users/register", {
                firstName, lastName, email, password,
            });

            runInAction(() => {
                this.user = data.user;
                this.accessToken = data.accessToken;
                this.refreshToken = data.refreshToken;
                this.isAuth = true;
                localStorage.setItem("token", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
            });

            return data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;
                const payload = err.response?.data;
                console.error("Register error (axios):", status, payload);

                throw { isAxiosError: true, status, payload, message: payload?.message ?? err.message };
            }

            console.error("Register error (unknown):", err);
            throw { isAxiosError: false, message: String((err as Error)?.message ?? "Unknown error") };
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async refresh() {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) return;

        try {
            const { data } = await $api.post("/users/refresh", { refreshToken });
            runInAction(() => {
                this.accessToken = data.accessToken;
                this.refreshToken = data.refreshToken;
                this.user = data.user;
                this.isAuth = true;
                localStorage.setItem("token", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
            });
        } catch (error) {
            console.error("Refresh token error", error);
            this.logout();
        }
    }

    /** Logout and clear state */
    async logout() {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            this.clearAuth();
            return;
        }

        try {
            await $api.post("/users/logout", { refreshToken });
        } catch (error) {
            console.error("Logout error", error);
        } finally {
            this.clearAuth();
        }
    }

    /** Clear all auth state */
   async clearAuth() {
        runInAction(() => {
            this.user = null;
            this.accessToken = null;
            this.refreshToken = null;
            this.isAuth = false;
        });
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
    }

    /** Check auth on app start */
    async checkAuth() {
        await this.refresh();
    }

    async fetchAllUsers() {
        this.isLoading = true;
        try {
            const { data } = await AdminService.getAllUsers();
            console.log(data);
            runInAction(() => {
                this.users = data;
            });
        } catch (error) {
            console.error("Failed to fetch all users in AuthStore:", error);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }
}

export const authStore = new AuthStore();