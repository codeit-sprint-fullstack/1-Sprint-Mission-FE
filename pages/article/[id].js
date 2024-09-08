import axios from '@/lib/axios';
import next from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import data from '@/lib/mock.js';
import styles from '@/styles/Article.module.css';

import profileIcon from '@/public/ic_profile.png';
import heartIcon from '@/public/ic_heart.png';
import dotIcon from '@/public/ic_dot.png';
import backBtn from '@/public/btn_back.png';
import Image from 'next/image';
import CreateDate from '@/utils/CreateDate.js';
import Comment from '@/components/Comment.js';
import line from '@/public/heartLine.png';

export default function Article() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [openOptions, setOpenOptions] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  // async function getArticle(targetId) {
  //   const res = await axios.get(`/articles/${targetId}`);
  //   const nextArticle = res.data;
  //   console.log(nextArticle);
  //   setArticle(nextArticle);
  // }

  const handleDropDown = () => {
    setOpenOptions((prev) => !prev);
  };

  useEffect(() => {
    if (!id) return;
    const nextArticle = data.find((article) => article.id === id);
    setArticle(nextArticle);
    if (nextArticle.comment.length > 0) {
      setComments(nextArticle.comment);
    }
  }, [id]);

  if (!id) return null;
  if (!article) return <div>Loading...</div>;

  return (
    <>
      <div className={styles.article}>
        <div className={styles.title}>
          <div className={styles.titleText}>{article.title}</div>
          <div>
            <Image
              src={dotIcon}
              alt='수정삭제 버튼'
              onClick={handleDropDown}
              className={styles.dotImage}
            />
            {openOptions && (
              <div className={styles.dropDown}>
                <Link href={`/article/patch/${id}`} className={styles.link}>
                  <div className={styles.dropDownText}>수정하기</div>
                </Link>
                <div className={styles.dropDownDelete}>삭제하기</div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.profile}>
          <Image src={profileIcon} alt='프로필 사진' width={40} height={40} />
          <p className={styles.userName}>{article.user.name}</p>
          <span className={styles.date}>
            <CreateDate createDate={article} className={styles.profileIcon} />
          </span>
          <Image src={line} alt='선' className={styles.line} />
          <div className={styles.heart}>
            <Image
              src={heartIcon}
              alt='하트 아이콘'
              className={styles.heartIcon}
            />
            <span className={styles.heartCount}>188</span>
          </div>
        </div>
        <div className={styles.content}>{article.content}</div>

        <Comment comments={comments} />

        <Link href='/freeboard'>
          <Image
            src={backBtn}
            alt='목록으로 돌아긱 버튼'
            className={styles.backBtn}
          />
        </Link>
      </div>
    </>
  );
}
