import {makeAutoObservable} from "mobx";
import AuthService from "@/services/AuthService";
import axios, {AxiosError, AxiosResponse} from "axios";
import {User, WorkHours, WorkHoursResponse} from "../../types/WorkHoursResponse";
import {AuthResponse} from "../../types/response/AuthResponse";
import WorkedHoursService from "@/services/WorkedHoursService";

export default class Store {
    user = {} as User;
    isAuth = false;
    workHours: WorkHours[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setUser(user: User) {
        this.user = user;
    }

    setIsAuth(isAuth: boolean) {
        this.isAuth = isAuth;
    }

    setWorkHours(workHours: WorkHours[]) {
        this.workHours = workHours;
    }

    async login(firstName: string, lastName: string,email: string, password: string) {
        try {
            const response = await AuthService.login(firstName,lastName,email, password);
            localStorage.setItem('token', response.data.accessToken)
            console.log(response.data)
            this.setIsAuth(true);
            console.log("isAuth", this.isAuth)
            this.setUser(response.data.user);

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.error);
            } else {
                console.log('Unexpected error:', error);
            }
        }
    }

    async register( firstName: string, lastName:string, email: string, password: string) {
        try {
            const response = await AuthService.register(firstName, lastName , email, password);
            localStorage.setItem('token', response.data.accessToken)
            console.log(response.data)
            this.setIsAuth(true);
            this.setUser(response.data.user);

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.error);
            } else {
                console.log('Unexpected error:', error);
            }
        }
    }

    async getWorkHours(email: string) {
        try {
            const response = await WorkedHoursService.fetchWorkHours(email);
            console.log(response.data)
            this.setWorkHours(response.data.workHours)
            return response.data

        } catch (error) {
            console.log(error)
        }
    }

    async checkAuth() {
        try {

            const response = await axios.get<AuthResponse>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/refresh`,
                {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken)
            console.log(response.data)
            this.setIsAuth(true);
            this.setUser(response.data.user);

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.error);
            }
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token')
            this.setIsAuth(false);
            this.setUser({} as User);

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.error);
            } else {
                console.log('Unexpected error:', error);
            }
        }
    }
}


export const store = new Store();