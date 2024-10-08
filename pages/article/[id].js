import styles from "./id.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getArticleId,
  // postComment,
  deleteArticle,
  // deletecomment,
} from "../api/articles";

import {
  postArticleComment,
  deleteArticleComment,
  patchArticleComment,
} from "../api/comments";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Modal from "../../components/articles/articleModal.js";
import CommentModal from "../../components/articles/articleCommentModal.js";
let pageSize = 3;
export async function getServerSideProps(path) {
  const { id } = path.params;
  return {
    props: {
      id,
    },
  };
}
export default function Post({ id }) {
  // 수정하기, 삭제하기 기능 추가해야 함 삭제하기 완료
  // 페이지네이션 어떤 방식으로 구현할지 생각해 보기..
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [ModalData, setModalData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [openComments, setOpenComments] = useState({});
  const [data, setData] = useState([]);
  const [date, setDate] = useState(""); // 바로 추가하려고했으나 {.slice(0, 10)}에서 오류가 발생.. 이유 못찾음
  const [commentContent, setCommentContent] = useState("");
  const [commnetdata, setCommnetdata] = useState([]);
  const [btnState, setbtnState] = useState("commentBtn");
  const router = useRouter();

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 핸들러 추가
    window.addEventListener("scroll", handleScroll);

    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 핸들러 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY === document.body.offsetHeight &&
      !isFetching
    ) {
      // 끝에 도달했는지 확인
      setIsFetching(true);
    }
  };

  useEffect(() => {
    if (!isFetching) return;

    // 여기서 데이터를 로드하거나 API 호출 가능
    pageSize += 3;
    console.log("데이터를 가져오는 중...");
    // console.log(pageSize);

    // 데이터 로드가 끝나면 isFetching 상태를 false로 설정
    setTimeout(() => {
      console.log("데이터 로드 완료");
      setIsFetching(false);
    }, 2000); // 임의의 지연 시간 추가
  }, [isFetching]);

  const article = async () => {
    const data = await getArticleId(id, pageSize);
    // console.log(data);
    setDate(data.data.article.createdAt.slice(0, 10));
    setData(data.data.article);
    setCommnetdata(data.data.article.comment);
  };
  useEffect(() => {
    article();
  }, [commnetdata]);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false);
  };
  const commentpost = async (e) => {
    e.preventDefault();
    const data = {
      content: commentContent,
    };

    try {
      await postArticleComment(id, data);
      setCommentContent("");
      // router.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const handletoggle = () => {
    setIsOpen(!isOpen);
    // console.log(commnetdata);
  };
  const handleCommentToggle = (index) => {
    setOpenComments((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 클릭된 인덱스의 상태만 토글
    }));
  };

  function movepage() {
    router.push(`/`);
  }
  const handlepatch = (id) => {
    //게시글
    // console.log(id);
    // console.log("수정코드");
    setIsModalOpen(true);
    setIsOpen(!isOpen);
  };
  const handleDelete = (id) => {
    // 게시글
    deleteArticle(id);
    setIsOpen(!isOpen);
    movepage();
  };
  const handlepatchComment = (index, commnetdata) => {
    //댓글수정

    const id = commnetdata[index].articleId;
    const commentsId = commnetdata[index].id;
    setIsModalOpen2(true);
    setModalData({ id, commentsId });

    setOpenComments((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const handleDeleteComment = async (index, commnetdata) => {
    //게시글
    // deletecomment(commnetdata.id, commnetdata[index].id);
    // console.log(commnetdata[index].articleId);
    // console.log(commnetdata[index].id);
    // console.log(commnetdata[index].id);
    const res = await deleteArticleComment(commnetdata[index].id);
    setOpenComments((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    if (res !== 500 || res !== 404) {
      // router.reload();
    } else {
      console.log("error");
    }
  };
  const handleComment = (e) => {
    e.preventDefault();
    setCommentContent(e.target.value);
  };
  useEffect(() => {
    if (commentContent.length > 1) {
      setbtnState("commentBtntrue");
    } else {
      setbtnState("commentBtn");
    }
  }, [commentContent]);

  return (
    <>
      <div className={styles.postContainer}>
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          id={data.id}
        ></Modal>
        <CommentModal
          isOpen={isModalOpen2}
          closeModal={closeModal}
          id={ModalData.id}
          commentsId={ModalData.commentsId}
        ></CommentModal>
        <div className={styles.pstInfo}>
          <div className={styles.posttop}>
            <p>{data.name}</p>
            <Image
              onClick={handletoggle}
              src="/kebab-btn.svg"
              width={24}
              height={24}
              className={styles.menuBtn}
            ></Image>
            {isOpen && (
              <ul className={styles.menu}>
                <li onClick={() => handlepatch(data.id)}>수정 하기</li>
                <li onClick={() => handleDelete(data.id)}>삭제 하기</li>
              </ul>
            )}
          </div>
          <div className={styles.postmiddle}>
            <div className={styles.posttitle}>
              <Image
                className={styles.postImg}
                src="/MyImg.svg"
                width={40}
                height={40}
              ></Image>
              <p className={styles.titlename}>{data.userId}</p>
              <p className={styles.titledate}>{date}</p>
            </div>
            <div>
              <button className={styles.likebtn}>♡ {data.like}</button>
            </div>
          </div>
          <div className={styles.postcontent}>
            <p>{data.content}</p>
          </div>
        </div>
        <div className={styles.commentContainer}>
          <p className={styles.commentTitle}>댓글 달기</p>
          <form className={styles.commentForm} onSubmit={commentpost}>
            <div className={styles.commentContent}>
              <textarea
                value={commentContent}
                onChange={handleComment}
                className={styles.commentInput}
                type="text"
                placeholder="댓글을 입력해주세요"
              ></textarea>

              {btnState === "commentBtn" ? (
                <button
                  className={styles[btnState]}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  등록
                </button>
              ) : (
                <button type="submit" className={styles[btnState]}>
                  등록
                </button>
              )}
            </div>
          </form>
        </div>
        <div className={styles.commentList}>
          {commnetdata.map((comment, index) => (
            <div className={styles.commentItemStyle} key={index}>
              <div className={styles.commenttop}>
                <p>{comment.content}</p>
                <Image
                  onClick={() => handleCommentToggle(index)}
                  src="/kebab-btn.svg"
                  width={24}
                  height={24}
                  className={styles.commentmenu}
                ></Image>
                {openComments[index] && (
                  <ul className={styles.menu}>
                    <li onClick={() => handlepatchComment(index, commnetdata)}>
                      수정 하기
                    </li>
                    <li onClick={() => handleDeleteComment(index, commnetdata)}>
                      삭제 하기
                    </li>
                  </ul>
                )}
              </div>
              <div className={styles.commentItem}>
                <Image
                  className={styles.commentImg}
                  src="/MyImg.svg"
                  width={32}
                  height={32}
                ></Image>
                <div className={styles.commentmiddle}>
                  <p className={styles.commentname}>{comment.name}</p>
                  <p className={styles.commentdate}>
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.commentbottom}>
          <button onClick={movepage} className={styles.commentbottomBtn}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </>
  );
}
