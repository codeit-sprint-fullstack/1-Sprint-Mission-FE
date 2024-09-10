let posts = [];
let nextId = 1;

export function getPosts() {
  return posts;
}

export function addPost(postData) {
  const newPost = {
    id: String(nextId++),
    title: postData.title,
    content: postData.content,
    comments: [],
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  return newPost;
}

export function getPostById(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) {
    throw new NotFoundException("해당 게시글을 찾을 수 없습니다.");
  }
  return post;
}

export function updatePost(id, postData) {
  const post = getPostById(id);
  Object.assign(post, postData, { updatedAt: new Date().toISOString() });
  return post;
}

export function deletePost(id) {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new NotFoundException("해당 게시글을 찾을 수 없습니다.");
  }
  posts.splice(index, 1);
}

export function getCommentsByPostId(postId) {
  const post = getPostById(postId);
  return post.comments;
}

export function addComment(postId, commentData) {
  const post = getPostById(postId);
  const newComment = {
    id: String(Date.now()),
    content: commentData.content,
    createdAt: new Date().toISOString(),
  };
  post.comments.push(newComment);
  return newComment;
}

export function getCommentById(postId, commentId) {
  const post = getPostById(postId);
  const comment = post.comments.find((c) => c.id === commentId);
  if (!comment) {
    throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
  }
  return comment;
}

export function updateComment(postId, commentId, commentData) {
  const comment = getCommentById(postId, commentId);
  Object.assign(comment, commentData, { updatedAt: new Date().toISOString() });
  return comment;
}

export function deleteComment(postId, commentId) {
  const post = getPostById(postId);
  const index = post.comments.findIndex((c) => c.id === commentId);
  if (index === -1) {
    throw new NotFoundException("해당 댓글을 찾을 수 없습니다.");
  }
  post.comments.splice(index, 1);
}
