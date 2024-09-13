import PatchForm from "@/components/patchArticle/PatchForm";
import axios from "@/lib/axios";
import Head from "next/head";
import { notFound } from "next/navigation";

export async function getServerSideProps(context) {
  const id = context.params["id"];

  try {
    const res = await axios.get(`/noticeBoards/${id}`);
    const data = res.data;
    return {
      props: {
        data,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export default function patchArticle({ data }) {
  return (
    <>
      <Head>
        <title>게시글 수정 - 자유게시판 | 판다마켓</title>
      </Head>
      <PatchForm data={data} />
    </>
  );
}
