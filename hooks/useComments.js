import { useEffect, useState } from 'react';
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
  const [canScroll, setCanScroll] = useState(false);
  const [cursorId, setCursorId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  async function getComments(articleId) {
    setLoading(true);
    try {
      const res = await fetchCommentsApi(articleId, cursorId);
      const { comments, totalCount } = res;

      setCursorId(
        comments.length > 0 ? comments[comments.length - 1].id : null
      );

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
      setCursorId(null);
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
    canScroll,
    loading,
    cursorId,
    setCursorId,
    setCanScroll,
  };
}
