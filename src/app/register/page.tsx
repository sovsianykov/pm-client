"use client";
import {AuthContextProvider} from "@/contexts/authContext";
import UsersSignupForm from "@/components/Forms/UsersSignupForm";


export default function RegisrePage() {

    return (<main className = "bg-gray-200 h-screen">
            <AuthContextProvider>
                <UsersSignupForm/>
            </AuthContextProvider>
        </main>
    )
}