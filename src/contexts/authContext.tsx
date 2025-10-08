"use client";
import { createContext, useContext } from "react";
import {authStore} from "@/store/authStore";

const AuthContext = createContext(authStore);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContext.Provider value={authStore}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);