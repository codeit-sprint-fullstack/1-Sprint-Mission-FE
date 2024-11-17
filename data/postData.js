import executeQuery from "../lib/db";
import { NotFoundException } from "../errors/CustomExceptions";

export async function getPosts(page = 0, limit = 10) {
  const offset = page * limit;
  const result = await executeQuery({
    query: "SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2",
    values: [limit, offset],
  });
  return result;
}

export async function getTotalPostsCount() {
  const result = await executeQuery({
    query: "SELECT COUNT(*) FROM posts",
  });
  return parseInt(result[0].count);
}

export async function addPost(postData) {
  const result = await executeQuery({
    query:
      "INSERT INTO posts (title, content, author_name) VALUES ($1, $2, $3) RETURNING *",
    values: [postData.title, postData.content, postData.author_name],
  });
  return result[0];
}

export async function getPostById(id) {
  const result = await executeQuery({
    query: "SELECT * FROM posts WHERE id = $1",
    values: [id],
  });
  if (result.length === 0) {
    throw new NotFoundException("해당 게시글을 찾을 수 없습니다.");
  }
  return result[0];
}

export async function updatePost(id, postData) {
  const result = await executeQuery({
    query:
      "UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
    values: [postData.title, postData.content, id],
  });
  if (result.length === 0) {
    throw new NotFoundException("해당 게시글을 찾을 수 없습니다.");
  }
  return result[0];
}

export async function deletePost(id) {
  const result = await executeQuery({
    query: "DELETE FROM posts WHERE id = $1 RETURNING *",
    values: [id],
  });
  if (result.length === 0) {
    throw new NotFoundException("해당 게시글을 찾을 수 없습니다.");
  }
  return true;
}

export async function getCommentsByPostId(postId) {
  const result = await executeQuery({
    query: "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC",
    values: [postId],
  });
  return result;
}

export async function addComment(postId, commentData) {
  const result = await executeQuery({
    query:
      "INSERT INTO comments (post_id, content, author_name) VALUES ($1, $2, $3) RETURNING *",
    values: [postId, commentData.content, commentData.author_name],
  });
  return result[0];
}

export async function getCommentById(postId, commentId) {
  const result = await executeQuery({
    query: "SELECT * FROM comments WHERE id = $1 AND post_id = $2",
    values: [commentId, postId],
  });
  if (result.length === 0) {
    throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
  }
  return result[0];
}

export async function updateComment(postId, commentId, content) {
  const result = await executeQuery({
    query:
      "UPDATE comments SET content = $1, updated_at = NOW() WHERE id = $2 AND post_id = $3 RETURNING *",
    values: [content, commentId, postId],
  });
  if (result.length === 0) {
    throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
  }
  return result[0];
}

export async function deleteComment(postId, commentId) {
  const result = await executeQuery({
    query: "DELETE FROM comments WHERE id = $1 AND post_id = $2 RETURNING *",
    values: [commentId, postId],
  });
  if (result.length === 0) {
    throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
  }
}
