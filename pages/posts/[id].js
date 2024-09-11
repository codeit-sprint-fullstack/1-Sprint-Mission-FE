import axios from '@/lib/axios';
import Image from 'next/image';
import kebabMenu from '@/public/ic_kebab.svg';
import profile from '@/public/ic_profile.svg';
import styles from '@/styles/Post.module.css';
import formatDate from '@/lib/formatDate';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Post() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  async function getPost(targetId) {
    const res = await axios.get(`/posts/${targetId}`);
    const result = res.data;
    setPost(result);
  }

  async function getComments(targetId) {
    const res = await axios.get(`/comments/free-board/${targetId}`);
    const result = res.data.comments ?? [];
    setComments(result);
  }

  useEffect(() => {
    if (!id) return;

    getPost(id);
    getComments(id);
  }, [id]);

  if (!post) return null;

  return (
    <>
      <div className={styles.topContainer}>
        <div className={styles.titleContainer}>
          <h4 className={styles.titleName}>{post.title}</h4>
          <div className={styles.kebabMenuWrapper}>
            <Image src={kebabMenu} alt="케밥 메뉴 이미지" />
          </div>
        </div>

        <div className={styles.userContainer}>
          <div className={styles.profileWrapper}>
            <Image src={profile} alt="프로필 이미지" />
          </div>
          <p>{formatDate(new Date(post.createdAt))}</p>
          <p className={styles.like}>❤️123</p>
        </div>

        <div>{post.content}</div>
      </div>
    </>
  );
}
