import { AxiosResponse } from "axios";
import {AuthResponse} from "../../types/response/AuthResponse";
import $api from "@/http/api";

export default class AuthService {
    static async login(firstName: string, lastName: string ,email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return   $api.post<AuthResponse>('/users/login', {firstName: firstName, lastName: lastName ,email: email, password: password });
    }

    static async register(firstName: string, lastName:string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return   $api.post<AuthResponse>('/users/register', {firstName, lastName ,email: email, password: password });
    }

    static async logout(): Promise<void> {
        return   $api.post('/users/logout');
    }

    static async refresh(): Promise<AxiosResponse<AuthResponse>> {
        return $api.get<AuthResponse>('/users/refresh');
    }
}