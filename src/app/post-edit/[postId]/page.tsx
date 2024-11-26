import ModifyPost from "./ModifyPost";
import { getPost } from "src/lib/api-post";

import { PostData, ModifyPostPageProps } from "src/types/post";

async function getPostData(postId: string): Promise<PostData> {
  const data = await getPost(postId);

  return await data;
}

export async function ModifyPostPage({ params }: ModifyPostPageProps) {
  const { postId } = params;

  const data = await getPostData(postId);

  return (
    <div>
      <ModifyPost postId={postId} data={data} />
    </div>
  );
}

export default ModifyPostPage;
