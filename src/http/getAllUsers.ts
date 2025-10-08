import $api from "@/http/api";
import {User} from "../../types/WorkHoursResponse";



export async function getAllUsers() {
    try {
        const res = await $api.get("/users");
        return res.data;

    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}
