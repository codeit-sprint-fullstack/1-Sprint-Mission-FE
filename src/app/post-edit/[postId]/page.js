import ModifyPost from "./ModifyPost.js";
import { getPost } from "@/lib/axios.js";

async function getPostData(postId) {
  const data = await getPost(postId);
  return await data;
}

export async function ModifyPostPage({ params }) {
  const { postId } = params;

  const data = await getPostData(postId);

  return (
    <div>
      <ModifyPost postId={postId} data={data} />
    </div>
  );
}

export default ModifyPostPage;
