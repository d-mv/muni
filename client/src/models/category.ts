import { IndexedStringsType } from ".";

export interface CategoryType {
  _id:string
  name: IndexedStringsType[];
  description: IndexedStringsType[];
  createdAt: Date;
}
