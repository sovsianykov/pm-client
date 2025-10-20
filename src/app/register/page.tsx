"use client";
import {AuthContextProvider} from "@/contexts/authContext";
import UsersSignupForm from "@/components/Forms/RegisterForm";


export default function RegisterPage() {

    return (<main className = "container">
            <AuthContextProvider>
                <UsersSignupForm/>
            </AuthContextProvider>
        </main>
    )
}