"use client";
import React, {FC} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import styles from "./Forms.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

type LoginData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

interface Props {
    onClose?: () => void;
}

const LoginForm: FC<Props> = ({onClose}) => {
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
            firstName: "",
            lastName: "",
        },
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<LoginData> = async (data) => {


        const {firstName, lastName, email, password} = data;

        try {
          auth.login(firstName, lastName, email, password)

            reset();
        } catch (error) {
            console.error("❌ Login failed:", error);
        }
        router.push("/")
    };

    return (
        <div className=" mx-auto w-[280px]">
            <h1 className="text-[1rem] mb-[0.2rem]">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label} htmlFor="first-name">
                    First Name
                </label>
                <input
                    className={styles["input-field"]}
                    autoComplete='first-name'
                    id="first-name"
                    type="text"
                    {...register("firstName", {
                        required: "first name is required",
                    })}
                    placeholder="First name"
                />
                {errors.firstName && (
                    <p className={styles.error}>{errors.firstName.message}</p>
                )}
                <label className={styles.label} htmlFor="last-name">
                    Last Name
                </label>
                <input
                    className={styles["input-field"]}
                    autoComplete='family-name'
                    id="last-name"
                    type="text"
                    {...register("lastName", {
                        required: "Last name is required",
                    })}
                    placeholder="Last name"
                />
                {errors.lastName && (
                    <p className={styles.error}>{errors.lastName.message}</p>
                )}
                <label className={styles.label} htmlFor="email">
                    Email
                </label>
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