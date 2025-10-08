import {User} from "../WorkHoursResponse";

export interface AuthResponse {
   accessToken: string;
   user: User;
}