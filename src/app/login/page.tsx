"use client"
import LoginForm from "@/components/Forms/LoginForm";


export default function WelcomePage() {

    return (
        <div  className="h-screen bg-gray-100 overflow-hidden">
            <div className='mt-[100px]'>
                <LoginForm />
            </div>
        </div>
    )
}