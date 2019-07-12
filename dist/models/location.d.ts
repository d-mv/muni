import * as mongoose from "mongoose";
export interface LocationNameType {
    [index: string]: string;
}
export interface LocationType {
    _id: mongoose.Schema.Types.ObjectId;
    name: LocationNameType;
    createdAt: Date;
}
