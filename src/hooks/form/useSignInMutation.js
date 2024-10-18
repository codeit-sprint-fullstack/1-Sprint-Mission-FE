import { useAuthStore } from '@shared/store/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { postSignIn } from '@utils/api/codeit';

export function usePostSignIn() {
  const auth = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (params) => postSignIn(params),
    onSuccess: (data) => {
      const user = data.user.nickname;
      auth({ user });
      window.location.href = '/';
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
