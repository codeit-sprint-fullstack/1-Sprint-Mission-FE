import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { dateFormatYYYYMMDD } from "@/utils/dateFormat";
import * as commentApi from "@/pages/api/comment";
import * as articleApi from "@/pages/api/articles";
import AlertModal from "@/components/Modals/AlertModal";
import DropdownData from "@/components/DropdownList/DropdownData";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import ic_kebab from "@/public/images/ic_kebab.png";
import ic_profile from "@/public/images/ic_profile.png";
import ic_heart from "@/public/images/ic_heart.png";
import img_reply_empty from "@/public/images/img_reply_empty.png";
import ic_back from "@/public/images/ic_back.png";
import styles from "@/styles/detailArticle.module.css";
import Comment from "@/components/Comment";
import { useQuery } from "@tanstack/react-query";

export async function getServerSideProps(context) {
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
    const { list } = await commentApi.getArticleComments(id);
    comments = list;
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
  const router = useRouter();

  const { data: articleData } = useQuery({
    queryKey: ["article"],
    queryFn: articleApi.getArticle(id),
    initialData: article,
  });

  const { data: commentData } = useQuery({
    queryKey: ["comments"],
    queryFn: commentApi.getArticleComments(id),
    initialData: comments,
  });

  const { title, content, favorite, writer, createAt } = articleData;
  //날짜 포멧
  const date = dateFormatYYYYMMDD(createAt);
  const defaultUser = {
    //유저관리를 안하고 있음 기본 유저를 설정 추후 유저관리의 로그인계정으로 변경해야 함
    userId: writer?.id,
    articleId: article.id,
  };
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
              <span className={styles.article_user}>{writer?.name}</span>
              <span className={styles.article_createAt}>{date}</span>
            </div>
            <div className={styles.article_favorite_box}>
              <button className={styles.article_favorite_btn}>
                <Image
                  src={ic_heart}
                  width={32}
                  height={32}
                  alt="좋아요이미지"
                />
                {favorite}
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
            {commentData.map((item) => (
              <Comment
                key={item.id}
                item={item}
                openAlert={openAlertModal}
                setAlertMessage={setAlertMessage}
              />
            ))}
            {/* 게시글의 등록된 댓글이 없다면 아래의 내용을 렌더링한다. */}
            {commentData.length < 1 && (
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
