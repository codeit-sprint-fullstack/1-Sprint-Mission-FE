import { CommentData } from "./comment";

export interface PostData {
  id: string;
  name: string;
  content: string;
  favoriteCount: number;
  images: string[];
  ownerId: string;
  ownerImage: string;
  ownerNickname: string;
  isFavorite: boolean;
  createdAt: string;
}

export interface PostListData {
  posts: PostData[];
  totalCount: number;
}

export interface PostDetailData extends PostData {
  comments: CommentData[];
}

export interface ModifyPostPageProps {
  params: {
    postId: string;
  };
}

export interface ModifyPostProps {
  postId: string;
  data: PostData;
}
