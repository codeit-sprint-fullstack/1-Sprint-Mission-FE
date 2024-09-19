import CommentFrom from "@/components/particularPage/CommentFrom";
import CommentList from "@/components/particularPage/CommentList";
import ProductParticularInfo from "@/components/particularPage/ProducParticularInfo";
import Head from "next/head";

export default function ItemsParticularPage() {
  return (
    <>
      <Head>
        <title>{'수정 필요'} - 자유게시판 | 판다마켓</title>
      </Head>
      <ProductParticularInfo />
      <CommentFrom
        //   Handler={postCommentHandler}
        mode={"중고마켓"}
      />
      <CommentList
        mode={"중고마켓"}
        comment={[]} // 불러온 데이터 배열
        // hasMore={hasMore} // 추가 데이터 여부
        // loadMore={loadMoreItems} // 페이지를 로드하는 함수
        // deleteCommentHandler={deleteCommentHandler}
        // patchComment={patchComment}
        // setPatchComment={setPatchComment}
        // patchCommentHandler={patchcomment}
      />
    </>
  );
}
