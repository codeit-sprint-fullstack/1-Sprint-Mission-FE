import { useEffect, useState, useRef } from 'react';
import {
  fetchCommentsApi,
  postCommentApi,
  deleteCommentApi,
} from '@/utils/api/commentApi.js';

export default function useComments({
  articleId,
  comment,
  setCommentsList,
  commentsList,
}) {
  const [canEdit, setCanEdit] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  let cursorIdRef = useRef(null);

  async function getComments(articleId) {
    setLoading(true);
    try {
      const res = await fetchCommentsApi(articleId, cursorIdRef.current);
      const { comments, totalCount } = res;

      cursorIdRef.current =
        comments.length > 0 ? comments[comments.length - 1].id : null;

      const mergedItems = [...commentsList, ...comments.slice(0, 5)];
      const uniqueComments = Array.from(
        new Map(mergedItems.map((item) => [item.id, item])).values()
      );

      if (uniqueComments.length >= totalCount) {
        setHasMore(false);
      }

      setCommentsList(uniqueComments);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteComments(targetId) {
    try {
      const res = await deleteCommentApi(targetId);
      cursorIdRef.current = null;
      setCommentsList([]);
      setHasMore(true);
      setCanEdit((prev) => !prev);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  async function postComment() {
    try {
      const res = await postCommentApi(articleId, comment);

      setCommentsList([res, ...commentsList]);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  useEffect(() => {
    if (comment) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [comment]);

  return {
    getComments,
    deleteComments,
    postComment,
    canEdit,
    canSubmit,
    loading,
    cursorIdRef,
    hasMore,
  };
}
