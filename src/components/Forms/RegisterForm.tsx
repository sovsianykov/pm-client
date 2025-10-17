"use client";
import {useForm, SubmitHandler} from "react-hook-form";
import styles from './Forms.module.scss'
import Button from "@/components/Button/Button";
import {useAuth} from "@/contexts/authContext";
import Link from "next/link";
import {observer} from "mobx-react-lite";
import {toast} from "react-toastify";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

};

export default observer(function UsersSignupForm() {
        const {
            register,
            handleSubmit,
            formState: {errors},
            setError,
            reset,
        } = useForm<FormData>({
            defaultValues: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
        });

        const auth = useAuth();
        const onSubmit: SubmitHandler<FormData> = async (data) => {
            const {firstName, lastName, email, password} = data;
            try {
                await auth.register(firstName, lastName, email, password);
                toast.success("User successfully created");
                reset();
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any
                const err: any = error;
                const fromPayload = err?.payload?.message;
                const fromAxios = err?.response?.data?.message; // стандартный Axios error
                const fromMsg = err?.message;

                const message = fromPayload ?? fromAxios ?? fromMsg ?? "Request failed";

                toast.error(message);

                if (typeof message === "string" && (message.toLowerCase().includes("user") || message.toLowerCase().includes("email"))) {
                    setError("email", { type: "server", message });
                }

                console.error("register error:", err);
            }
        };

        return (
            <div className=' mx-auto md:w-[432px] px-[1.5rem]'>
                <div className='text-[2rem] mb-[1rem] font-[500]'>Register</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-[2rem] font-[500]'>Register</h1>
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
                        <Button text={"Register"} type={"submit"}/>
                        <Link href="/login">
                            <Button text={"to Login Page"} type={"button"}/>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
)