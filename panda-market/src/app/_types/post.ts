import type { Comment } from "./comment";

export interface Post {
  id: string;
  title: string;
  content: string;
  images: string[];
  views: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  authorId: string;
  _count: {
    comments: number;
    likes: number;
  };
  comments: Comment[];
  isAuthor?: boolean;
}

export interface EditPostData {
  title: string;
  content: string;
  images: string[];
}

export interface PostUpdateInput {
  id: string;
  title: string;
  content: string;
  images: string[];
}
