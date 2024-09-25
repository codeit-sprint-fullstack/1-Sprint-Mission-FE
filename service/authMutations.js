import { useQueryClient } from "@tanstack/react-query";
import { createUser } from "./api/auth";
import { useRouter } from "next/router";

export function useCreateArticle() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: (data) => {
      console.log(data);
      router.push(`/login`);

      queryClient.invalidateQueries(articleKey.lists());
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
