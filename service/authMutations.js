import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "./api/auth";

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("user");
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
