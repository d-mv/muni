export interface IndexedStringsType {
    [index: string]: string;
}
export interface Category {
    name: IndexedStringsType[];
    description: IndexedStringsType[];
    createdAt: Date;
}
