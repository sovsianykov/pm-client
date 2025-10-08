import axios, { AxiosResponse } from "axios";
import {WorkHoursResponse} from "../../types/WorkHoursResponse";
import $api from "@/http/api";

export default class WorkedHoursService {

    static async fetchWorkHours(email: string): Promise<AxiosResponse<WorkHoursResponse>> {
        const year = new Date().getUTCFullYear();
        const month = new Date().getMonth() + 1;

        try {
            const response = await $api.get<WorkHoursResponse>(
                `/work-hours/${encodeURIComponent(email)}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                    params: { year, month}
                }
            );

            return response;
        } catch (error) {
            console.error("❌ Error fetching work hours:", error);
            throw error;
        }
    }


    static async createOrUpdateWorkHours(
        email: string,
        date: string,
        hours: number,
        status: string
    ): Promise<AxiosResponse<WorkHoursResponse>> {
        try {
            const response = await axios.post<WorkHoursResponse>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/work-hours`,
                { email, date, hours , status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return response;
        } catch (error) {
            console.error("❌ Error creating/updating work hours:", error);
            throw error;
        }
    }

    static async deleteWorkHours(
        email: string,
        date: string
    ): Promise<AxiosResponse<{ success: boolean }>> {
        try {
            const response = await axios.delete<{ success: boolean }>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/work-hours/${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    params: { date },
                }
            );

            return response;
        } catch (error) {
            console.error("❌ Error deleting work hours:", error);
            throw error;
        }
    }
}
