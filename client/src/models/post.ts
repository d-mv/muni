export interface ReplyType {
  text: string;
  createdAt: string;
  up: string[];
  down: string[];
}

export interface PostType {
  _id: string;
  location: string;
  title: string;
  problem: string;
  solution: string;
  photo: string;
  link: string;
  newsId?: string;
  createdBy: string;
  category: string;
  active: boolean;
  votes: string[];
  votesCount: number;
  reply: ReplyType;
  createdAt: string;
}
