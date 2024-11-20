export interface ErrorResponse {
  response?: {
    data: {
      message: string;
    };
    status: number;
  };
}

// 코멘트 데이터 타입
export interface Comment {
  id: string;
  productId?: string;
  articleId?: string; // Article ID는 게시글 댓글에만 해당
  userId: string;
  nickname: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 코멘트 요청 타입 (댓글 작성 시)
export interface PostCommentData {
  content: string;
}

// 코멘트 수정 요청 타입 (댓글 수정 시)
export interface PatchCommentData {
  content: string;
}

// 코멘트 가져오기 파라미터 타입
export interface GetCommentsParams {
  limit: number;
}
