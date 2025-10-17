import { makeAutoObservable, runInAction } from "mobx";
import $api from "@/http/api";
import {WorkedHours} from "../../types/WorkHoursResponse";
import WorkedHoursService from "@/services/WorkedHoursService";



export class WorkedHoursStore {
    workedHours: WorkedHours[] = [];
    isLoading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchWorkedHours(email: string) {
        this.isLoading = true;
        this.error = null;

        try {
            const res = await WorkedHoursService.fetchWorkHours(email);
            runInAction(() => {
                this.workedHours = Array.isArray(res.data)
                    ? res.data.map((item: any) => ({
                        ...item,
                        hoursWorked: String(item.hoursWorked ?? 0),
                    }))
                    : [];
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message ?? "Loading error";
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async createWorkedHours(email: string ,trackedHours: number  , date: string , status: string ) {
        try {
            const response = await  $api.post("/work-hours", {
                email: email,
                trackedHours: trackedHours,
                date: date,
                status: status,
            })

            console.log(response);
            await runInAction(() => {})
        } catch (error) {
            console.log(error);
        }
    }
     clean() {
        try {

             runInAction(() => {
                this.workedHours = [];
            })

        } catch (error) {
            console.log(error);
        }
    }
}

export const workedHoursStore = new WorkedHoursStore();