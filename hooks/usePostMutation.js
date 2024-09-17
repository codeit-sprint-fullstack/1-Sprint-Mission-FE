import { useMutation } from "react-query";
import { postComment } from "@/utils/communityAPI";

const usePostMutation = (onSuccess, onError) => {
  const mutation = useMutation(postComment, {
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
      console.error("댓글 등록 오류:", error);
    },
  });

  const mutateComment = ({ postId, content }) => {
    mutation.mutate({ postId, content });
  };

  return {
    mutateComment,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default usePostMutation;
