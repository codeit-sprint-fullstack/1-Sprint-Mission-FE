export interface CommentData {
  id: string;
  content: string;
  ownerId: string;
  ownerNickname: string;
  ownerImage: string;
  createdAt: Date;
}

export interface CommentListProps {
  data: {
    list: CommentData[];
  };
  updateComment?: ({
    commentId,
    content,
  }: {
    commentId: string;
    content: string;
  }) => void;
  deleteComment?: (commentId: string) => void;
}
