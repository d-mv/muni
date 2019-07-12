import { ObjectID } from "bson";
export declare enum UserKind {
    "user" = 0,
    "muni" = 1
}
export interface UserSettings {
    language: string;
    help: boolean;
}
export interface UserType {
    _id: ObjectID;
    location: ObjectID;
    fName: string;
    lName: string;
    email: string;
    pass: string;
    type: UserKind;
    tokens: string[];
    settings: UserSettings;
    status: boolean;
    createdAt: Date;
}
