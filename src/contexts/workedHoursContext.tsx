"use client";

import { createContext, useContext } from "react";
import {workedHoursStore} from "@/store/workedHoursStore";

const WorkedHoursContext = createContext(workedHoursStore);

export const WorkedHoursContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <WorkedHoursContext.Provider value={workedHoursStore}>
            {children}
        </WorkedHoursContext.Provider>
    );
};

export const useWorkedHours = () => useContext(WorkedHoursContext);
