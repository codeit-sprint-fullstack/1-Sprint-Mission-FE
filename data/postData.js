import db from "../lib/db";
import { NotFoundException } from "../errors/CustomExceptions";

export async function getPosts() {
  const result = await db.query("SELECT * FROM posts ORDER BY created_at DESC");
  return result.rows;
}

export async function addPost(postData) {
  const result = await db.query(
    "INSERT INTO posts (title, content, author_name) VALUES ($1, $2, $3) RETURNING *",
    [postData.title, postData.content, postData.author_name]
  );
  return result.rows[0];
}

export async function getPostById(id) {
  const result = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    throw new NotFoundException("해당 게시글을 찾을 수 없습니다.");
  }
  return result.rows[0];
}

export async function updatePost(id, postData) {
  const result = await db.query(
    "UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
    [postData.title, postData.content, id]
  );
  if (result.rows.length === 0) {
    throw new NotFoundException("해당 게시글을 찾을 수 없습니다.");
  }
  return result.rows[0];
}

export async function deletePost(id) {
  const result = await db.query("DELETE FROM posts WHERE id = $1 RETURNING *", [
    id,
  ]);
  if (result.rows.length === 0) {
    throw new NotFoundException("해당 게시글을 찾을 수 없습니다.");
  }
  return true;
}

export async function getCommentsByPostId(postId) {
  const result = await db.query(
    "SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC",
    [postId]
  );
  return result.rows;
}

export async function addComment(postId, commentData) {
  const result = await db.query(
    "INSERT INTO comments (post_id, content, author_name) VALUES ($1, $2, $3) RETURNING *",
    [postId, commentData.content, commentData.author_name]
  );
  return result.rows[0];
}

export async function getCommentById(postId, commentId) {
  const result = await db.query(
    "SELECT * FROM comments WHERE id = $1 AND post_id = $2",
    [commentId, postId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
  }
  return result.rows[0];
}

export async function updateComment(postId, commentId, commentData) {
  const result = await db.query(
    "UPDATE comments SET content = $1, updated_at = NOW() WHERE id = $2 AND post_id = $3 RETURNING *",
    [commentData.content, commentId, postId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
  }
  return result.rows[0];
}

export async function deleteComment(postId, commentId) {
  const result = await db.query(
    "DELETE FROM comments WHERE id = $1 AND post_id = $2 RETURNING *",
    [commentId, postId]
  );
  if (result.rows.length === 0) {
    throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
  }
}
