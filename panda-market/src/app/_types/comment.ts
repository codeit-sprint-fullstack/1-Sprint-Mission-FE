export interface BaseComment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
  postId: string | null;
  productId: string | null;
}

export interface PostComment extends BaseComment {
  postId: string;
  productId: null;
}

export interface ProductComment extends BaseComment {
  productId: string;
  postId: null;
}

export type Comment = PostComment | ProductComment;
