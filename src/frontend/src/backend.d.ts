import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Pest {
    name: string;
    treatment: string;
    affectedCrops: string;
    symptoms: string;
}
export interface AddFarmLogRequest {
    crop: string;
    date: string;
    note: string;
}
export interface FarmLog {
    crop: string;
    date: string;
    note: string;
}
export interface Crop {
    watering: string;
    name: string;
    description: string;
    season: string;
    spacing: string;
    daysToHarvest: bigint;
}
export interface Profile {
    farmName: string;
    location: string;
}
export interface Question {
    question: string;
    answer: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFarmLog(request: AddFarmLogRequest): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllCrops(): Promise<Array<Crop>>;
    getAllPests(): Promise<Array<Pest>>;
    getAllQuestions(): Promise<Array<Question>>;
    getCallerProfile(): Promise<Profile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyFarmLogs(): Promise<Array<FarmLog>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerProfile(profile: Profile): Promise<void>;
    searchCrops(keyword: string): Promise<Array<Crop>>;
    searchPests(keyword: string): Promise<Array<Pest>>;
    searchQuestions(keyword: string): Promise<Array<Question>>;
}
