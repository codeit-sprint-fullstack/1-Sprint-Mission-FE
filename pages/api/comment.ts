import instance from "./httpClient.js";

interface Params {
  [key: string]: string | number;
}

interface Comment {
  id: string;
  content: string;
  createAt: Date;
  updateAt: Date;
  userId: string;
  user: { id: string; nickname: string };
}

export async function getArticleComments(
  id: string,
  cursor: string
): Promise<Comment[]> {
  const res = await instance.get<Comment[]>(`comments/${id}/article`, {
    params: {
      limit: 5,
      cursor,
    },
  });
  return res.data;
}

export async function getProductComments(
  id: string,
  cursor: string
): Promise<Comment[]> {
  const res = await instance.get<Comment[]>(`comments/${id}/product`, {
    params: {
      limit: 5,
      cursor,
    },
  });
  return res.data;
}

export async function createArticlesComment(
  params: Params = {},
  articleId: string
): Promise<Comment> {
  const res = await instance.post<Comment>(
    `comments/${articleId}/article`,
    params
  );
  return res.data;
}

export async function createProductComment(
  params: Params = {},
  articleId: string
): Promise<Comment> {
  const res = await instance.post<Comment>(
    `comments/${articleId}/product`,
    params
  );
  return res.data;
}

export async function updateComment(
  commentId: string,
  item: { content: string }
): Promise<Comment> {
  const res = await instance.patch(`/comments/${commentId}`, item);
  return res.data;
}

export async function deleteComment(commentId: string): Promise<number> {
  const res = await instance.delete(`/comments/${commentId}`);
  return res.status;
}
