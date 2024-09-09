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
import * as api from "@/pages/api/comment";
import AlertModal from "@/components/Modals/AlertModal";
import { useRouter } from "next/router";

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

function Comment({ item }) {
  const { content, user, createAt } = item;
  const date = dateFormatYYYYMMDD(createAt);

  return (
    <div className={styles.comment_item_box}>
      <div className={styles.comment_item_content_box}>
        <h1 className={styles.comment_content}>{content}</h1>
        <Image src={ic_kebab} width={24} height={24} alt="수정/삭제이미지" />
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
          <span className={styles.comment_date}>{date}</span>
        </div>
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
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const openModal = () => setOpenAlertModal(true);
  const closeModal = () => setOpenAlertModal(false);

  const createComment = () => {
    try {
      const data = api.createComment(values);
      if (data) {
        router.reload();
      } else {
        //모달 오픈
        setAlertMessage("댓글생성에 실패했습니다." + error.name);
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
      <AlertModal
        onClose={closeModal}
        isOpen={openAlertModal}
        message={alertMessage}
      />
      <main>
        <div className={styles.article_item_box}>
          <div className={styles.article_item_title_box}>
            <h1 className={styles.article_title}>{title}</h1>
            <Image
              src={ic_kebab}
              width={24}
              height={24}
              alt="수정/삭제이미지"
            />
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
              <Comment key={item.id} item={item} />
            ))}
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
