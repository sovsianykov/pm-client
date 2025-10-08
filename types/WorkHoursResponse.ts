export interface Role {
    value: string;
    description: string;
}

export enum Status {
    WORK = 'WORK',
    WEEKEND = 'WEEKEND',
    VACATION = 'VACATION',
    WORKING = 'WORKING',
    SICK = 'SICK',
    HOLIDAY = 'HOLIDAY',
}


export interface WorkedHours {
    id: number;
    email: string;
    trackedHours: number;
    date: string;
    createdAt: string;
    updatedAt: string;
    staus: Status;
}


export interface User {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    roles: Role[];
    qualification: string;
    trackedHours: WorkedHours[];
}

export interface WorkHoursResponse {
    access_token: string;
    user: User;
    workHours: WorkedHours[];
}