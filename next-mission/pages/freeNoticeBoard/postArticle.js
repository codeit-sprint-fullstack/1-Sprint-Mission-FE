import PostForm from "@/components/postArticle/PostForm";
import Head from "next/head";

export default function postArticle() {
  return (
    <>
      <Head>
        <title>게시글 쓰기 - 자유게시판 | 판다마켓</title>
      </Head>
      <PostForm />
    </>
  );
}
