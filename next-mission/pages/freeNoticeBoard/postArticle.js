import PostForm from "@/components/postArticle/PostForm";
import Head from "next/head";

export default function PostArticle() {
  return (
    <>
      <Head>
        <title>게시글 등록 - 자유게시판 | 판다마켓</title>
      </Head>
      <PostForm />
    </>
  );
}
