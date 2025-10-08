"use client";

import Project from "@/containers/Project/Project";
import ModalTopAlert from "@/components/Modal/ModalPortal";
import { AuthContextProvider} from "@/contexts/authContext";
import ReportHoursForm from "@/components/Forms/ReportHoursForm";
import {useState} from "react";

export default function ReportPage() {

const [open, setOpen] = useState(false);





    return (
        <div className="p-8 mt-20">
            <AuthContextProvider>
                <ReportHoursForm/>
            </AuthContextProvider>
        </div>
    );
}