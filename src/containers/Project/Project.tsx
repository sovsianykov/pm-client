"use client";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Timetable from "@/components/Timetable/Timetable";
import { useWorkedHours } from "@/contexts/workedHoursContext";
import { useAuth } from "@/contexts/authContext";
import {toJS} from "mobx";

export default observer(function Project() {
    const workedHoursStore = useWorkedHours();
    const auth = useAuth()

    useEffect(() => {
        const email = toJS(auth.user?.email);
        if (!email) return;
        workedHoursStore.fetchWorkedHours(email);
    }, [auth.user?.email, workedHoursStore]);

    return (
        <div className="w-full h-screen">
            <div className="flex mt-[100px] items-center justify-center">
                <Timetable  />
            </div>
        </div>
    );
});

