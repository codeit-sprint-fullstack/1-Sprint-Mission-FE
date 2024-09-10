import Input from './Input';
import Textarea from './Textarea';
import styles from './CreatePostForm.module.css';

export default function CreatePostForm({ title, content, setTitle, setContent }) {
  // 게시글 제목 작성 시 업데이트
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  // 게시글 내용 작성 시 업데이트
  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className={styles.container}>
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
    </div>
  );
}
