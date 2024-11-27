import instance from "@/pages/api/httpClient";
import { Entity } from "@/utils/interface/defaultEntity";
import { User } from "@/utils/interface/User.js";

interface Params {
  [key: string]: string | number;
}

interface Comment extends Entity {
  content: string;
  userId: string;
  user: User;
}

interface ResponseData {
  list: Comment[];
  nextCursor: string;
}

export async function getArticleComments(
  id: string,
  cursor: string = ""
): Promise<ResponseData> {
  const res = await instance.get<ResponseData>(`comments/${id}/article`, {
    params: {
      limit: 5,
      cursor,
    },
  });
  return res.data;
}

export async function getProductComments(
  id: string,
  cursor: string = ""
): Promise<ResponseData> {
  const res = await instance.get<ResponseData>(`comments/${id}/product`, {
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

export async function createProductComment<T>(
  params: Params = {},
  productId: T
): Promise<Comment> {
  const res = await instance.post<Comment>(
    `comments/${productId}/product`,
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
