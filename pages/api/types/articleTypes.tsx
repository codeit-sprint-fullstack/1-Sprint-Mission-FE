export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  name: string;
  articleId: string;
  userId: string;
}

export interface Article {
  id: string;
  name: string; // `title`에서 `name`으로 변경됨
  userId: string; // `authorId`에서 `userId`로 변경됨
  content: string;
  createdAt: string;
  updatedAt?: string;
  favoriteCount: number;
  images: string[];
  comment: Comment[]; // `comments`에서 `comment`로 변경됨
}

export interface PostArticleData {
  name: string;
  content: string;
  images: string[];
}

export interface ErrorResponse {
  response?: {
    data: {
      message: string;
    };
    status: number;
  };
}

export interface GetArticlesParams {
  pageSize?: number;
  keyword?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
}
