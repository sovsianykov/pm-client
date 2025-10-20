import $api from "@/http/api";

export default class AdminService {
    static async getAllUsers() {
        try {
             return  await $api.get("/users");

        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    }
}


