import {Role} from "../WorkHoursResponse";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles?: Role[];
}