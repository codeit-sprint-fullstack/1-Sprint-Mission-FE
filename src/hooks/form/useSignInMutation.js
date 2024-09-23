import { useMutation } from '@tanstack/react-query';
import { postSignIn } from '@utils/api/codeit';

export function usePostSignIn() {
  return useMutation({
    mutationFn: (params) => postSignIn(params),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
