import { getArticle } from "../api/articles";
import Image from "next/image";
import styles from "@/styles/detailArticle.module.css";
import ic_kebab from "@/public/images/ic_kebab.png";
import ic_profile from "@/public/images/ic_profile.png";
import ic_heart from "@/public/images/ic_heart.png";
import img_reply_empty from "@/public/images/img_reply_empty.png";
import ic_back from "@/public/images/ic_back.png";
import { dateFormatYYYYMMDD } from "@/utils/dateFormat";
import Link from "next/link";
import { useState } from "react";
import * as commentApi from "@/pages/api/comment";
import * as articleApi from "@/pages/api/articles";
import AlertModal from "@/components/Modals/AlertModal";
import { useRouter } from "next/router";
import DropdownData from "@/components/DropdownList/DropdownData";
import ConfirmModal from "@/components/Modals/ConfirmModal";

export async function getServerSideProps(context) {
  const { id } = context.params;

  let article = [];
  try {
    const data = await getArticle(id);
    article = data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      article,
    },
  };
}

function Comment({ item, openAlert, setMessage }) {
  const { content, user, createAt, updateAt } = item;
  const router = useRouter();
  const createDate = dateFormatYYYYMMDD(createAt);
  const updateDate = dateFormatYYYYMMDD(updateAt);

  const [CommentDropdown, setCommentDropdown] = useState(false);
  const [contentUpdate, setContentUpdate] = useState(false);
  const [value, setValue] = useState(content);
  const openCommentDropdown = () => setCommentDropdown(!CommentDropdown);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onContentUpdate = () => {
    setContentUpdate(true);
    setCommentDropdown(false);
  };
  const onUpdateCancel = () => {
    setContentUpdate(false);
    setCommentDropdown(true);
  };

  const updateComment = async () => {
    try {
      const res = await commentApi.updateComment(item.id, { content: value });
      if (res) {
        setContentUpdate(false);
        router.reload();
      }
    } catch (error) {
      console.log(error);
      setMessage("댓글 수정에 실패했습니다." + error.name);
      openAlert();
    }
  };

  return (
    <div className={styles.comment_item_box}>
      <div className={styles.comment_item_content_box}>
        {contentUpdate ? (
          <textarea
            className={styles.comment_content_textarea}
            name="content"
            onChange={onChange}
            value={value || ""}
          />
        ) : (
          <p className={styles.comment_content}>{content}</p>
        )}
        {!contentUpdate && (
          <Image
            onClick={openCommentDropdown}
            src={ic_kebab}
            width={24}
            height={24}
            alt="수정/삭제이미지"
          />
        )}

        {CommentDropdown && <DropdownData handleUpdate={onContentUpdate} />}
      </div>
      <div className={styles.comment_content_data_box}>
        <Image
          src={ic_profile}
          width={40}
          height={40}
          alt="사용자프로필이미지"
        />
        <div className={styles.comment_content_data}>
          <span className={styles.comment_name}>{user.name}</span>
          <div>
            <span className={styles.comment_date}>{createDate}</span>
            {updateDate !== createDate && (
              <span className={styles.comment_update_date}>
                ( 수정됨 {updateDate} )
              </span>
            )}
          </div>
        </div>

        {contentUpdate && (
          <div className={styles.comment_update_box}>
            <button
              onClick={onUpdateCancel}
              className={styles.comment_data_cancel_btn}
            >
              취소
            </button>
            <button
              onClick={updateComment}
              className={styles.comment_data_save_btn}
            >
              수정
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailArticle({ article }) {
  const router = useRouter();
  const { title, content, favorite, user, createAt, comment } = article;

  const defaultUser = {
    //유저관리를 안하고 있음 기본 유저를 설정 추후 유저관리의 로그인계정으로 변경해야 함
    userId: user.id,
    articleId: article.id,
  };

  const date = dateFormatYYYYMMDD(createAt);
  const [values, setValues] = useState(defaultUser);
  const [Alert, setAlert] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // 모달 오픈상태 값
  const openAlertModal = () => setAlert(true);
  const closeAlertModal = () => setAlert(false);
  const openConfirmModal = () => setConfirm(true);
  const closeConfirmModal = () => setConfirm(false);

  //수정/삭제 드롭다운오픈 상태 값
  const [ArticleDropdown, setArticleDropdown] = useState(false);
  const openArticleDropdown = () => setArticleDropdown(!ArticleDropdown);

  // 게시글수정을 선택시 Registration 페이지의 쿼리로 게시글의 id를 전달한다.
  const updateArticle = () => {
    router.push(`/Articles/Registration?id=${article.id}`);
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
      const data = commentApi.createComment(values);
      if (data) {
        router.reload();
      } else {
        //모달 오픈
        setAlertMessage("댓글생성에 실패했습니다.");
        openModal();
      }
    } catch (error) {
      setAlertMessage("댓글생성에 실패했습니다." + error.name);
      openModal();
      console.log(error);
    }
  };

  const onChangeValues = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    onChangeValues(name, value);
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
        message={alertMessage}
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
            {ArticleDropdown && (
              <DropdownData
                handleUpdate={updateArticle}
                handleDelete={() => {
                  //삭제의 경우 confirm 모달을 통하여 확인하여 진행한다.
                  setAlertMessage(
                    "게시글이 영구적으로 삭제됩니다. 삭제 하시겠습니까?"
                  );
                  openConfirmModal();
                }}
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
              <span className={styles.article_user}>{user.name}</span>
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
            onChange={onChange}
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
            {comment.map((item) => (
              <Comment
                key={item.id}
                item={item}
                openAlert={openAlertModal}
                setMessage={setAlertMessage}
              />
            ))}
            {/* 게시글의 등록된 댓글이 없다면 아래의 내용을 렌더링한다. */}
            {comment.length < 1 && (
              <>
                <Image
                  src={img_reply_empty}
                  width={140}
                  height={140}
                  alt="댓글이없습니다"
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
