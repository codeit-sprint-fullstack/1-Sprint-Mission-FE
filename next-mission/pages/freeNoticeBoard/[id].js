import CommentFrom from "@/components/particularPage/CommentFrom";
import CommentList from "@/components/particularPage/CommentList";
import ParticularInformation from "@/components/particularPage/ParticularInformation";
import axios from "@/lib/axios";
import Head from "next/head";
import { notFound } from "next/navigation";
import { useState } from "react";

export async function getServerSideProps(context) {
  const id = context.params["id"];

  try {
    const res = await axios.get(`/noticeBoards/${id}`);
    const resComment = await axios.get(`/noticeBoards/${id}/freeCommends`);
    const data = res.data;
    const commentData = resComment.data.list ?? [];
    return {
      props: {
        data,
        commentData,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export default function particularPage({ data, commentData }) {
  const [comment, setComment] = useState(commentData);

  // 댓글 추가 함수
  const postCommentHandler = async (value) => {
    const subject = {
      content: value,
      noticeBoardId: data.id,
    };

    const res = await axios.post("/freeCommends", subject);
    const comment = res.data;

    setComment((prevComment) => [comment, ...prevComment]);
  };

  // 댓글 삭제 함수
  const deleteCommentHandler = async (id, idx) => {
    await axios.delete(`/freeCommends/${id}`);
    const nextComment = [...comment]
    nextComment.splice(idx, 1)
    setComment(nextComment)
  };

  return (
    <>
      <Head>
        <title>{data.title} - 자유게시판 | 판다마켓</title>
      </Head>
      <ParticularInformation data={data} />
      <CommentFrom postHandler={postCommentHandler} />
      <CommentList
        comment={comment}
        deleteCommentHandler={deleteCommentHandler}
      />
    </>
  );
}
