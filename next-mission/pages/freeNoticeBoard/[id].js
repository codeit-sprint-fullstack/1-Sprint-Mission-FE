import CommentFrom from "@/components/particularPage/CommentFrom";
import CommentList from "@/components/particularPage/CommentList";
import ParticularInformation from "@/components/particularPage/ParticularInformation";
import Spinner from "@/components/public/Spinner";
import styles from '@/styles/FreeNoticeBoard.module.css'
import instance from "@/lib/axios";
import Head from "next/head";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const id = context.params["id"];

  try {
    const res = await instance.get(`/noticeBoards/${id}`);
    const resComment = await instance.get(
      `/noticeBoards/${id}/freeCommends?pageSize=5`
    );
    const noticeBoardData = res.data;
    const commentData = resComment.data.list ?? [];
    const cursorData = resComment.data.cursorInfo.NextCusor;
    return {
      props: {
        noticeBoardData,
        commentData,
        cursorData,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export default function ParticularPage({
  noticeBoardData,
  commentData,
  cursorData,
}) {
  const [comment, setComment] = useState(commentData);
  const [cursor, setCursor] = useState(""); // 현재 커서
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const [nextCursor, setNextCursor] = useState(cursorData);
  const [patchCommend, setPatchCommend] = useState({
    boolinValue: false,
    contentValue: "",
    id: "",
    idx: "",
  });

  // API를 통해 데이터를 가져오는 함수
  const fetchItems = async (cursor) => {
    try {
      const res = await instance.get(
        `/noticeBoards/${noticeBoardData.id}/freeCommends?cursor=${cursor}&pageSize=5`
      );
      const data = res.data;
      setComment((prevComment) => [...prevComment, ...data.list]);
      setNextCursor(data.cursorInfo.NextCusor);
      if (data.cursorInfo.NextCusor === "null") {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // 페이지가 변경될 때마다 데이터를 가져옴
  useEffect(() => {
    if (cursor !== "") {
      fetchItems(cursor);
    }
  }, [cursor]);

  // 커서 변경 함수
  const loadMoreItems = () => {
    setCursor(nextCursor);
  };

  // 댓글 추가 함수
  const postCommentHandler = async (value) => {
    const subject = {
      content: value,
      noticeBoardId: noticeBoardData.id,
    };

    const res = await instance.post("/freeCommends", subject);
    const comment = res.data;

    setComment((prevComment) => [comment, ...prevComment]);
  };

  // 댓글 수정 함수
  const patchcomment = async (value) => {
    const subject = {
      content: value,
    };
    const res = await instance.patch(
      `/freeCommends/${patchCommend.id}`,
      subject
    );
    const data = res.data;

    const newComment = [...comment];
    newComment.splice(patchCommend.idx, 1, data);
    setComment(newComment);
  };

  // 댓글 삭제 함수
  const deleteCommentHandler = async (id, idx) => {
    await instance.delete(`/freeCommends/${id}`);
    const nextComment = [...comment];
    nextComment.splice(idx, 1);
    setComment(nextComment);
    setPatchCommend({
      boolinValue: false,
      contentValue: "",
      id: "",
      idx: "",
    });
  };

  return (
    <>
      <Head>
        <title>{noticeBoardData.title} - 자유게시판 | 판다마켓</title>
      </Head>
      <ParticularInformation data={noticeBoardData} />
      {patchCommend.boolinValue || (
        <CommentFrom
          Handler={postCommentHandler}
          mode={"등록"}
          patchCommend={patchCommend}
          setPatchCommend={setPatchCommend}
        />
      )}
      {patchCommend.boolinValue && (
        <CommentFrom
          Handler={patchcomment}
          mode={"수정"}
          patchCommend={patchCommend}
          setPatchCommend={setPatchCommend}
        />
      )}
      <CommentList
        comment={comment} // 불러온 데이터 배열
        hasMore={hasMore} // 추가 데이터 여부
        loadMore={loadMoreItems} // 페이지를 로드하는 함수
        deleteCommentHandler={deleteCommentHandler}
        patchCommend={patchCommend}
        setPatchCommend={setPatchCommend}
      />
    </>
  );
}
