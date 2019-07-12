export interface NewsType {
    _id: string;
    location: string;
    title: string;
    text: string;
    photo: string;
    link: string;
    active: boolean;
    pinned: boolean;
    createdAt: Date;
}
