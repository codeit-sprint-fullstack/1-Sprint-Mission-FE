"use client";

import { useRouter } from "next/navigation";

export function PostDetailClient({ articleId }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div>{articleId}</div>
      <button onClick={handleBack}>뒤로 가기</button>
    </div>
  );
}

export default PostDetailClient;
