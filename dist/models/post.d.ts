import { ObjectID } from "bson";
export interface ReplyType {
    text: string;
    createdAt: Date;
    up: ObjectID[];
    down: ObjectID[];
}
export interface PostType {
    location: ObjectID;
    title: string;
    problem: string;
    solution: string;
    photo?: string;
    link?: string;
    newsId?: ObjectID;
    createdBy: ObjectID;
    category: ObjectID;
    active: boolean;
    votes?: ObjectID[];
    reply?: ReplyType;
    createdAt: Date;
}
