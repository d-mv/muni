import { IndexedStringsType } from ".";

export interface LocationType {
  _id: string;
  name: IndexedStringsType;
  createdAt: Date;
}

export interface LocationState {
  [index: number]: LocationType;
}
