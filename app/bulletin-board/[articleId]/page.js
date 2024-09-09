import PostDetailClient from "./PostDetailClient";

export function Post({ params }) {
  const { articleId } = params;

  return (
    <div>
      <PostDetailClient articleId={articleId} />
    </div>
  );
}

export default Post;
