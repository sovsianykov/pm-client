"use client";
import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./Forms.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type LoginData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

interface Props {
    onClose?: () => void;
}

const LoginForm: FC<Props> = () => {
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<LoginData>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<LoginData> = async (data) => {


        const { email, password } = data;

        try {
          auth.login(email, password)

            toast.success("User successfully logged in");
            setTimeout(() => router.push("/"), 0);



            reset();
        } catch (error) {
            console.error("❌ Login failed:", error);
            toast.error("❌ Login failed:");

        }
    };

    return (
        <div className=" mx-auto w-[280px]">
            <h1 className="text-[1rem] mb-[0.2rem]">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    className={styles["input-field"]}
                    autoComplete='email'
                    id="email"
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                        },
                    })}
                    placeholder="Email"
                />
                {errors.email && (
                    <p className={styles.error}>{errors.email.message}</p>
                )}

                <label className={styles.label} htmlFor="password">
                    Password
                </label>
                <input
                    type="password"
                    autoComplete='current-password'
                    className={styles["input-field"]}
                    id="password"
                    {...register("password", {required: "Password is required"})}
                    placeholder="Password"
                />
                {errors.password && (
                    <p className={styles.error}>{errors.password.message}</p>
                )}

                <div className="mt-4 w-full flex flex-wrap justify-between">
                    <Button text={"Login"} type={"submit"}/>
                    <Link href="/register">
                        <Button text={"To Signup Form"} type={"button"}/>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;