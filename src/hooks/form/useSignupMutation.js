import { useMutation } from '@tanstack/react-query';
import { postSignup } from '@utils/api/codeit';

export function usePostSignup() {
  return useMutation({
    mutationFn: (params) => postSignup(params),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
