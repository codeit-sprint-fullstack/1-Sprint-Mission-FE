import Input from './Input';
import Textarea from './Textarea';
import styles from './CreatePostForm.module.css';
import Button from './Button';

export default function CreatePostForm({
  title,
  content,
  setTitle,
  setContent,
  onSubmit,
  isFormValid,
}) {
  // 게시글 제목 변경 핸들러
  // 상위(writing page)로 전달
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  // 게시글 내용 변경 핸들러
  // 상위(writing page)로 전달
  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  // 폼 제출 핸들러
  const handleSubmit = (event) => {
    event.preventDefault(); // 브라우저 기본 제출 방지
    onsubmit(); // 상위 컴포넌트의 제출 함수 호출
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <h3>게시글 쓰기</h3>
        <Button
          name="등록"
          className={styles.createPostButton}
          disabled={!isFormValid}
          onClick={onSubmit}
        />
      </div>

      <form className={styles.container} onSubmit={handleSubmit}>
        <label className={styles.title}>*제목</label>
        <Input
          className={styles.createPostFormInput}
          name="title"
          value={title}
          onChange={onChangeTitle}
          placeholder="제목을 입력해주세요"
          autoComplete="off"
        />
        <label className={styles.content}>*내용</label>
        <Textarea
          className={styles.createPostFormTextarea}
          name="content"
          value={content}
          onChange={onChangeContent}
          placeholder="내용을 입력해주세요"
        />
      </form>
    </>
  );
}
