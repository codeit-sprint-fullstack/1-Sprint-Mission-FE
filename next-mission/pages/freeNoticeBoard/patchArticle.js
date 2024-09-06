import PatchForm from "@/components/patchArticle/PatchForm";
import Head from "next/head";

export default function pacthArticle() {
  return (
    <>
      <Head>
        <title>게시글 수정 - 자유게시판 | 판다마켓</title>
      </Head>
      <PatchForm />
    </>
  );
}