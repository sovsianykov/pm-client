"use client";

import {AuthContextProvider} from "@/contexts/authContext";
import AdminContainer from "@/containers/AdminContainer/AdminContainer";

export default  function RegisterPage() {


    return (
        <div className="p-8 mt-20 w-full">
            <AuthContextProvider>
               <AdminContainer/>
            </AuthContextProvider>
        </div>
    );
}