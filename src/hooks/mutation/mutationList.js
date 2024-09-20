import { postArticle } from '@utils/api/api';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default mutation = {
  postArticle: {
    mutationFn: (id) => postArticle(id),
    onSuccess: (data) => {
      const queryClient = useQueryClient();
      const router = useRouter();
      queryClient.invalidateQueries(['articles']);
      router.push(`/articles/${data.id}`);
    },
  },
};
