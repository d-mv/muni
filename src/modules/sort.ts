import { PostType } from "../models/post";

export const sortPosts = (posts:PostType[]) => posts.sort((a: PostType, b: PostType) =>
  a.votes.length < b.votes.length ? 1 : -1
);
