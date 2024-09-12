import styles from "./create.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { postArticles } from "../api/api";
export default function create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [btnState, setbtnState] = useState("addpostBtnfalse");

  const router = useRouter();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    if (title.length > 0 && content.length > 0) {
      setbtnState("addpostBtntrue");
    } else {
      setbtnState("addpostBtnfalse");
    }
  }, [title, content]);

  const postClick = async (e) => {
    e.preventDefault();
    console.log("클릭했음");
    const data = {
      title: title,
      content: content,
    };
    try {
      await postArticles(data);
      router.push(`/`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className={styles.addpostContainer}>
        <form className={styles.addpostporm} onSubmit={postClick}>
          <div className={styles.addposttitle}>
            <p>게시글 쓰기</p>
            {btnState === "addpostBtnfalse" ? (
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
          <div className={styles.addpostContent}>
            <div className={styles.formtitle}>
              <p>* 제목</p>
              <input
                onChange={handleTitleChange}
                className={styles.InputTitle}
                type="text"
                placeholder="제목을 입력해주세요"
              />
            </div>
            <div className={styles.formContent}>
              <p>* 내용</p>
              <textarea
                onChange={handleContentChange}
                className={styles.InputContent}
                type="text"
                placeholder="내용을 입력해주세요"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
