import { WorkedHours } from "../../types/WorkHoursResponse";
import { WeekDayInfo } from "../../types/workDayInfo";

export function getWeeksInfo(
    data: WorkedHours[],
): { currentWeek: WeekDayInfo[]; previousWeek: WeekDayInfo[] , currentMonth: string, totalTrackedHours:string } {
    const today = new Date();

    const getLocalISODate = (date: Date) => date.toLocaleDateString("sv-SE");

    const startOfWeek = (date: Date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = (day === 0 ? -6 : 1) - day; // понедельник — первый день недели
        d.setDate(d.getDate() + diff);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const addDays = (date: Date, n: number) => {
        const d = new Date(date);
        d.setDate(d.getDate() + n);
        return d;
    };

    const getDayInfo = (date: Date): WeekDayInfo => {
        const isoDate = getLocalISODate(date);
        const existing = data.find((d) => d.date.startsWith(isoDate));

        const dayName = date.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue, ...
        const isWeekend = [0, 6].includes(date.getDay());
        const isToday = isoDate === getLocalISODate(today);

        return {
            date: isoDate,
            day: date.getDate(),
            dayName,
            trackedHours: existing ? Number(existing.trackedHours ?? existing.trackedHours ?? 0) : 0,
            status: "WORK",
            isWeekend,
            isToday,
        };
    };

    const currentWeekStart = startOfWeek(today);
    const previousWeekStart = addDays(currentWeekStart, -7);

    const currentWeek: WeekDayInfo[] = Array.from({ length: 7 }, (_, i) =>
        getDayInfo(addDays(currentWeekStart, i))
    );

    const previousWeek: WeekDayInfo[] = Array.from({ length: 7 }, (_, i) =>
        getDayInfo(addDays(previousWeekStart, i))
    );

    const getMonthName = (date: Date) =>
        date.toLocaleDateString("en-US", { month: "long" });

    const currentMonth = getMonthName(today);


    const totalTracked = currentWeek.reduce((sum, d) => sum + (d.isWeekend ? 0 : d.trackedHours), 0);
    const maxPossible = 40;
    const missing = Math.max(maxPossible - totalTracked, 0);
    const totalTrackedHours = `${totalTracked}/${maxPossible}/${missing}`;

    return { currentWeek, previousWeek, currentMonth, totalTrackedHours  };
}
