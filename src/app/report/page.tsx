"use client";


import {AuthContextProvider} from "@/contexts/authContext";
import ReportHoursForm from "@/components/Forms/ReportHoursForm";

export default function ReportPage() {


    return (
        <div className="p-8 mt-20">
            <AuthContextProvider>
                <ReportHoursForm/>
            </AuthContextProvider>
        </div>
    );
}