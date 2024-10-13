import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  CREATE_UPDATE,
  CRUD_COMMENT,
  DELETE,
  MUTATE_LIKE,
} from "@/variables/entities";

//to create product or article
export function useCreateMutation({ entity }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { path, queryKey, create: axiosFunction } = CREATE_UPDATE(entity);

  return useMutation({
    mutationFn: (newArticle) => axiosFunction(newArticle),
    onSuccess: async (data) => {
      if (data?.id) {
        await queryClient.invalidateQueries({ queryKey: queryKey(data.id) });
        await queryClient.refetchQueries(queryKey(data.id));
        router.push(`${path}/${data.id}`);
        console.log("successCreate:", queryKey());
      }
    },
  });
}

//to update article or product

export function useUpdateMutation({ entity, id }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { path, queryKey, update: axiosFunction } = CREATE_UPDATE(entity);

  return useMutation({
    mutationFn: (updateData) => axiosFunction(id, updateData),
    onSuccess: async (data) => {
      if (data && data.id) {
        console.log(data.id);

        await queryClient.invalidateQueries({ queryKey: queryKey(data.id) });
        await queryClient.refetchQueries(queryKey(data.id));
        router.push(`${path}/${data.id}`);
        console.log("successUpdate", queryKey(data.id));
      }
    },
  });
}

export function useDeleteMutation({ entity }) {
  const queryClient = useQueryClient();

  const { queryKey, delete: axiosFunction } = DELETE(entity);

  return useMutation({
    mutationFn: (idPath) => axiosFunction(idPath),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey() });

      console.log("successDeletion", queryKey());
    },
  });
}

export function useDeleteComment({ whichComment, idPath }) {
  const queryClient = useQueryClient();

  const { queryKey, delete: axiosFunction } = CRUD_COMMENT(whichComment);

  return useMutation({
    mutationFn: (commentId) => {
      return axiosFunction(commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey(idPath) });
      console.log("successCommentDeletion:", queryKey(idPath));
    },
  });
}

//comments
export function useCreateComment({ idPath, whichComment }) {
  const queryClient = useQueryClient();
  const { queryKey, create: axiosFunction } = CRUD_COMMENT(whichComment);

  return useMutation({
    mutationFn: (data) => axiosFunction(idPath, data),
    onSuccess: () => {
      console.log("successMutation: create an comment");
      queryClient.invalidateQueries({
        queryKey: queryKey(idPath),
      });
    },
  });
}

export function useUpdateComment({ whichComment, idPath, commentId }) {
  const queryClient = useQueryClient();

  const { queryKey, update: axiosFunction } = CRUD_COMMENT(whichComment);

  return useMutation({
    mutationFn: (data) => axiosFunction(commentId, data),
    onSuccess: () => {
      console.log("successMutation:  update an comment");
      queryClient.invalidateQueries({
        queryKey: queryKey(idPath),
      });
      console.log(queryKey(idPath));
    },
  });
}

//mutate like
export function useLikeMutation({ entity, id, isLiked }) {
  const queryClient = useQueryClient();
  const { queryKey, create, delete: remove } = MUTATE_LIKE(entity);

  return useMutation({
    mutationFn: (id) => {
      return isLiked ? remove(id) : create(id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: queryKey(id),
      });

      const prevData = queryClient.getQueryData({ queryKey: queryKey() });

      queryClient.setQueryData({
        queryKey: queryKey(id),
        updater: (prev) => {
          return {
            ...prev,
            isFavorite: !isLiked,
            favoriteCount: isLiked
              ? prev.favoriteCount + 1
              : prev.favoriteCount - 1,
          };
        },
      });
      return { prevData };
    },
    onError: (context) => {
      queryClient.setQueryData({
        queryKey: queryKey(id),
        updater: context.prevData,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey(id) });
    },
  });
}
