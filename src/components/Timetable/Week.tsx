"use client";

import styles from "./Week.module.scss";
import Day from "@/components/Timetable/Day";
import { WeekDayInfo } from "../../../types/workDayInfo";

interface WeekProps {
    week:WeekDayInfo[]
    totalTrackedHour:string
}

const Week: React.FC<WeekProps> = ({ week=[], totalTrackedHour }) => {

    return (
        <div className='border-b-[3px] border-b-[#e1e1e1] border-l-[3px] border-l-[#e1e1e1] border-r-[3px] border-r-[#e1e1e1]'>
            <div className={styles.week}>
                {week.map(d => <Day date={d.day} key={d.day} trackedHours={d.trackedHours} isToday={d.isToday } isWeekend={d.isWeekend} />)}
            </div>
            <div className='w-full h-[25.5] bg-[#f7f7f7] py-[5px] flex items-center justify-center text-[13px]'>
                {totalTrackedHour}
            </div>
        </div>
    );
};

export default Week;