import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postArticle } from '@utils/api/api';
import { useRouter } from 'next/navigation';

const getMutationOptions = (queryClient, router, mutationKey) => {
  const mutations = {
    postArticle: {
      mutationFn: () => postArticle(),
      onSuccess: (data) => {
        queryClient.invalidateQueries(['articles']);
        router.push(`/articles/${data.id}`);
      },
    },
  };

  return mutations[mutationKey];
};

export default function customMutation(mutationKey = 'postArticle') {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationOptions = getMutationOptions(queryClient, router, mutationKey);

  return useMutation({
    mutationFn: mutationOptions.mutationFn,
    onSuccess: mutationOptions.onSuccess,
    onError: (error) => {
      console.log(error);
    },
  });
}
