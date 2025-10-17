"use client";

import {useForm, SubmitHandler} from "react-hook-form";
import styles from "./Forms.module.scss";
import Button from "@/components/Button/Button";
import {observer} from "mobx-react-lite";
import {useWorkedHours} from "@/contexts/workedHoursContext";
import Link from "next/link";
import {useAuth} from "@/contexts/authContext";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from "react";
import {format} from "date-fns";
import {useRouter} from "next/navigation";

type FormData = {
    hours: string;
    status: string;
};

const AddWorkedHoursForm = observer(() => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormData>({
        defaultValues: {
            hours: "",
            status: "WORK",
        },
    });

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const date = startDate ? format(startDate, 'yyyy-MM-dd') : ""

    const workRepo = useWorkedHours()
    const auth = useAuth();

    const router = useRouter();

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {

        if (!auth.user) return <h1>Something vent wrong!</h1>;

        try {
            await workRepo.createWorkedHours(auth.user?.email, Number(data.hours), date, data.status);
            setTimeout(() => router.push("/"), 0);
            reset();

        } catch (error) {
            console.error("❌ Failed to submit:", error);
        }
    };

    return (
        <div className="mx-auto md:w-[432px] px-[1.5rem]">
            <div className="text-[1rem] mb-[1rem] font-[500]">Add Work Hours</div>
            <DatePicker
                className="px-3"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label} htmlFor="hours">
                    Hours
                </label>
                <input
                    className={styles["input-field"]}
                    id="hours"
                    type="number"
                    min="0"
                    {...register("hours", {
                        required: "Hours are required",
                        min: {value: 0, message: "Hours must be positive"},
                    })}
                    placeholder="Enter worked hours"
                />
                {errors.hours && <p className={styles.error}>{errors.hours.message}</p>}

                <label className={styles.label} htmlFor="status">
                    Status
                </label>
                <select
                    id="status"
                    className={styles["input-field"]}
                    {...register("status", {required: "Status is required"})}
                >
                    <option value="WORK">WORK</option>
                    <option value="SICK">SICK</option>
                    <option value="VACATION">VACATION</option>
                    <option value="DAY_OFF">DAY_OFF</option>
                </select>
                {errors.status && <p className={styles.error}>{errors.status.message}</p>}

                <div className="mt-4 w-full flex justify-between">
                    <Button text="Submit" type="submit"/>
                    <Link href="/login">
                        <Button text="to login page" inverted/>
                    </Link>
                </div>
            </form>
        </div>
    );
});

export default AddWorkedHoursForm;
