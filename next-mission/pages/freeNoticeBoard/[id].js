import CommentFrom from "@/components/particularPage/CommentFrom";
import CommentList from "@/components/particularPage/CommentList";
import ParticularInformation from "@/components/particularPage/ParticularInformation";
import Head from "next/head";

export default function particularPage() {
  return (
    <>
      <Head>
        <title>{"게시글 제목"} - 자유게시판 | 판다마켓</title>
      </Head>
      <ParticularInformation />
      <CommentFrom />
      <CommentList />
    </>
  );
}
