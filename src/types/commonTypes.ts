// User 타입
export interface User {
  id: number;
  nickname: string;
}

// Like 타입
export interface LikeData {
  id: number;
  userId: number;
  articleId?: number;
  productId?: number;
  createdAt: string;
}

// Comment 타입
export interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentResponse extends CommentData {
  userId: number;
  articleId?: number;
  productId?: number;
  user?: User;
  likes: LikeData[];
}
