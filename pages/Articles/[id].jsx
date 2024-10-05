import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { dateFormatYYYYMMDD } from "@/utils/dateFormat";
import * as commentApi from "@/pages/api/comment";
import * as articleApi from "@/pages/api/articles";
import AlertModal from "@/components/Modals/AlertModal";
import DropdownData from "@/components/DropdownList/DropdownData";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import ic_kebab from "@/public/images/ic_kebab.png";
import ic_profile from "@/public/images/ic_profile.png";
import ic_heart from "@/public/images/ic_heart.png";
import ic_heart_liked from "@/public/images/ic_heart_liked.png";
import img_reply_empty from "@/public/images/img_reply_empty.png";
import ic_back from "@/public/images/ic_back.png";
import styles from "@/styles/detailArticle.module.css";
import Comment from "@/components/Comment";
import { RefContext } from "@/pages/_app";
import useAuth from "@/contexts/authContext";
import { useDebouncedCallback } from "use-debounce";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { setContext } from "../api/httpClient";

export async function getServerSideProps(context) {
  setContext(context);
  const { id } = context.query;

  let article = {};
  let comments = [];
  try {
    const data = await articleApi.getArticle(id);
    article = data;
  } catch (error) {
    console.log(error);
  }
  try {
    const response = await commentApi.getArticleComments(id);
    comments = response;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      article,
      comments,
      id,
    },
  };
}

function DetailArticle({ article, comments, id }) {
  //권한인증
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const globalDivRef = useContext(RefContext); //무한 스크롤 쿼리용 Ref

  //게시글  SSR initialData
  const { data: articleData } = useQuery({
    queryKey: ["article", id],
    queryFn: () => articleApi.getArticle(id),
    initialData: article,
  });

  //무한스크롤 쿼리를 통한 react-query관리
  const {
    data: commentsData,
    fetchStatus, //로딩 에니메이션용
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: ({ pageParam }) => commentApi.getArticleComments(id, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.nextCursor ? lastPage.nextCursor : undefined,
    initialData: {
      pages: [comments], // comments 배열을 pages로 감싸서 전달
      pageParams: [comments.nextCursor], // pageParams 기본값 설정
    },
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      //해당 상품의 사용자 좋아요상태의 따라 호출하는 API를 달리 한다.
      if (isFavorite) {
        await articleApi.unlikeArticle(id);
      } else {
        await articleApi.likeArticle(id);
      }
    },
    onMutate: async () => {
      //만약 refetch를 진행중이라면 mutation의 값을 덮어쓸수 있기 때문에 취소해준다
      await queryClient.cancelQueries({
        queryKey: ["article", id],
      });

      //실패할 경유의 대비하여 이전의 상태를 저장한다
      const prevArticle = queryClient.getQueryData(["article", id]);

      queryClient.setQueryData(["article", id], (prev) => ({
        ...prev,
        isFavorite: !prev.isFavorite, //isFavorite 값을 반전
        favoriteCount: prev.isFavorite
          ? prev.favoriteCount - 1 //현재 좋아요 상품이라면 취소되면서 count down
          : prev.favoriteCount + 1,
      }));
      return { prevArticle }; //실패할 경우 반환되는 값은 onError의 context로 전달 된다
    },
    onError: (error, {}, context) => {
      console.log(error);
      queryClient.setQueryData(["article", id], context.prevArticle);
    },
    onSettled: (data, err) => {
      queryClient.invalidateQueries({
        queryKey: ["article", id],
      });
    },
  });

  const handleLikeButtonClick = () => {
    if (!user) return; //로그인이 되어 있지 않으면 뮤테이션을 실행하지 않게 리턴한다.
    likeMutation.mutate();
  };

  const { title, content, favoriteCount, isFavorite, owner, createAt } =
    articleData;
  //날짜 포멧
  const date = dateFormatYYYYMMDD(createAt);
  const defaultUser = { articleId: article.id };
  const [values, setValues] = useState(defaultUser);
  const [Alert, setAlert] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  // 모달 오픈상태 값
  const openAlertModal = () => setAlert(true);
  const closeAlertModal = () => setAlert(false);
  const openConfirmModal = () => setConfirm(true);
  const closeConfirmModal = () => setConfirm(false);

  //수정/삭제 드롭다운오픈 상태 값
  const [openDropdown, setOpenDropdown] = useState(false);
  const openArticleDropdown = () => setOpenDropdown(!openDropdown);

  // 게시글수정을 선택시 Registration 페이지의 쿼리로 게시글의 id를 전달한다.
  const updateArticle = () => {
    router.push(`/Articles/Registration?id=${article.id}`);
  };

  const handleDeleteArticle = () => {
    //삭제의 경우 confirm 모달을 통하여 확인하여 진행한다.
    setConfirmMessage("게시글이 영구적으로 삭제됩니다. 삭제하시겠습니까?");
    openConfirmModal();
  };

  const deleteArticle = () => {
    try {
      const res = articleApi.deleteArticle(article.id);
      if (res) {
        router.push("/Articles");
      } else {
        setAlertMessage("게시글 삭제에 실패했습니다.");
        openAlertModal();
        closeConfirmModal();
      }
    } catch (error) {
      setAlertMessage("게시글 삭제에 실패했습니다." + error.name);
      openAlertModal();
      closeConfirmModal();
      console.log(error);
    }
  };

  const createComment = () => {
    try {
      const data = commentApi.createArticlesComment(values);
      if (data) {
        router.reload();
      } else {
        //모달 오픈
        setAlertMessage("댓글생성에 실패했습니다.");
        openAlertModal();
      }
    } catch (error) {
      setAlertMessage("댓글생성에 실패했습니다." + error.name);
      openAlertModal();
      console.log(error);
    }
  };

  const handleChangeValues = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChangeValues(name, value);
  };

  const moreDataFetch = useDebouncedCallback(() => {
    if (globalDivRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      });
      observer.observe(globalDivRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, 500);

  useEffect(() => {
    moreDataFetch();
  }, [moreDataFetch, fetchNextPage]);

  return (
    <>
      {/* 모달을 콘텐츠의 최상위에 위치하기 위함 */}
      <AlertModal
        onClose={closeAlertModal}
        isOpen={Alert}
        message={alertMessage}
      />
      <ConfirmModal
        onConfirm={deleteArticle}
        onClose={closeConfirmModal}
        isOpen={Confirm}
        message={confirmMessage}
      />
      <main>
        <div className={styles.article_item_box}>
          <div className={styles.article_item_title_box}>
            <h1 className={styles.article_title}>{title}</h1>
            <Image
              onClick={openArticleDropdown}
              src={ic_kebab}
              width={24}
              height={24}
              alt="수정/삭제이미지"
            />
            {openDropdown && (
              <DropdownData
                handleUpdate={updateArticle}
                handleDelete={handleDeleteArticle}
              />
            )}
          </div>
          <div className={styles.article_data_box}>
            <div className={styles.article_data}>
              <Image
                src={ic_profile}
                width={40}
                height={40}
                alt="사용자프로필이미지"
              />
              <span className={styles.article_user}>{owner?.nickname}</span>
              <span className={styles.article_createAt}>{date}</span>
            </div>
            <div className={styles.article_favorite_box}>
              <button
                onClick={handleLikeButtonClick}
                className={styles.article_favorite_btn}
              >
                <Image
                  src={isFavorite ? ic_heart_liked : ic_heart}
                  width={32}
                  height={32}
                  alt="좋아요이미지"
                />
                {favoriteCount}
              </button>
            </div>
          </div>
        </div>
        <p className={styles.article_content}>{content}</p>
        <div className={styles.article_comment_box}>
          <h3>댓글달기</h3>
          <textarea
            name="content"
            onChange={handleChange}
            className={styles.article_comment_textarea}
            placeholder="댓글을 입력해주세요."
          />
          <button
            onClick={createComment}
            className={`${styles.article_create_comment_btn} ${
              !values.content && styles.disabled
            }`}
            disabled={!values.content}
          >
            등록
          </button>
        </div>
        <div className={styles.article_comments_box}>
          <div className={styles.article_comments}>
            {commentsData.pages.list > 0 &&
              commentsData?.pages.map((items) =>
                items.list.map((item) => (
                  <Comment
                    key={item.id}
                    item={item}
                    openAlert={openAlertModal}
                    setAlertMessage={setAlertMessage}
                  />
                ))
              )}
            {fetchStatus === "fetching" && (
              <div className={styles.loader}></div>
            )}
            {/* 게시글의 등록된 댓글이 없다면 아래의 내용을 렌더링한다. */}
            {commentsData.pages[0].list.length < 1 && (
              <>
                <Image
                  src={img_reply_empty}
                  width={140}
                  height={140}
                  alt="댓글이없습니다"
                  priority
                />
                <p>
                  아직 댓글이 없어요, <br />
                  지금 댓글을 달아보세요!
                </p>
              </>
            )}
          </div>
          <Link href={"/Articles"}>
            <button className={styles.return_articles_page_btn}>
              목록으로 돌아가기
              <Image src={ic_back} width={24} height={24} alt="돌아가기" />
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}

export default DetailArticle;
