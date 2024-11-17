import { useMutation } from "react-query";
import {
  postComment,
  updatePost,
  deletePost,
  updateComment,
  deleteComment,
  createPost,
} from "@/utils/communityAPI";

const usePostMutation = (type, onSuccess, onError) => {
  let mutationFn;

  switch (type) {
    case "createPost":
      mutationFn = createPost;
      break;
    case "updatePost":
      mutationFn = updatePost;
      break;
    case "deletePost":
      mutationFn = deletePost;
      break;
    case "createComment":
    case "postComment":
      mutationFn = postComment;
      break;
    case "updateComment":
      mutationFn = updateComment;
      break;
    case "deleteComment":
      mutationFn = deleteComment;
      break;
    default:
      throw new Error(`Invalid mutation type: ${type}`);
  }

  const mutation = useMutation(mutationFn, {
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      if (onError) {
        onError(error);
      }
      console.error(`${type} 오류:`, error);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default usePostMutation;
