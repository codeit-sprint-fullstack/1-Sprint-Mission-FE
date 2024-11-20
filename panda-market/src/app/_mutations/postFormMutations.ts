import { api } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

export const usePostFormMutations = () => {
  const router = useRouter();
  const utils = api.useUtils();

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      void utils.post.list.invalidate();
      router.push("/community");
    },
  });

  return {
    createPost,
  };
};

// 객체타입 명확하게 지정할 필요있음
