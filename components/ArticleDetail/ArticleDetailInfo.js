import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import line from '@/public/heartLine.png';
import profileIcon from '@/public/ic_profile.png';
import heartIcon from '@/public/ic_heart.png';
import heartFullIcon from '@/public/ic_heart_full.png';
import dotIcon from '@/public/ic_dot.png';
import DateFormat from '@/utils/DateFormat.js';
import DropDown from '@/utils/DropDown.js';
import { postFavoriteApi, deleteFavoriteApi } from '@/utils/api/favorite';
import styles from '@/styles/Article.module.css';
import { useEditArticle } from '@/hooks/useFreeBoard';
import { deleteFleaMArketArticle } from '@/hooks/useFleaMarket';
export default function ArticleDetailInfo({
  article,
  category,
  handleDeleteArticle,
}) {
  const [openOptions, setOpenOptions] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [favorite, setFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(article?.favorite || 0);
  const articleId = article?.id || '';
  // useCallback 사용

  const handleDropDown = useCallback(() => {
    setOpenOptions((prev) => !prev);
  }, []);

  const { deleteArticle } = useEditArticle({ id });
  const { deleteFleaMArketArticle } = useEditArticle({ id });

  const buttonEvent = () => {
    if (confirm('정말 삭제하시겠습니까??') === true) {
      try {
        if (category === 'freeboard') {
          deleteArticle(id);
          router.push('/freeboard');
        } else {
          deleteFleaMArketArticle;
          router.push('/fleamarket');
        }
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    } else {
      return;
    }
  };

  const handleFavorite = async (articleId, category) => {
    setFavorite((prev) => !prev);
    if (!favorite) {
      setFavoriteCount((prev) => Math.max(prev + 1, 0));
      await postFavoriteApi(articleId, category);
    } else {
      setFavoriteCount((prev) => Math.max(prev - 1, 0));
      await deleteFavoriteApi(articleId, category);
    }
  };

  const handleEdit = useCallback(() => {
    if (category === 'freeboard') {
      router.push(`/freeboard/edit/${id}`);
    } else {
      router.push(`/fleamarket/edit/${id}`);
    }
  }, [id, router, category]);

  if (!article) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className={styles.title}>
        <div className={styles.titleText}>{article.title}</div>
        <div className={styles.buttonTest}>
          <Image
            src={dotIcon}
            alt='수정삭제 버튼'
            onClick={handleDropDown}
            className={styles.dotImage}
          />
          {openOptions && (
            <DropDown
              firstAction={{
                onClickHandler: handleEdit,
                label: '수정하기',
              }}
              secondAction={{
                onClickHandler: buttonEvent,
                label: '삭제하기',
              }}
            />
          )}
        </div>
      </div>
      <div className={styles.profile}>
        <Image src={profileIcon} alt='프로필 사진' width={40} height={40} />
        <p className={styles.userName}>{article.user.name}</p>
        <span className={styles.date}>
          <DateFormat createDate={article} className={styles.profileIcon} />
        </span>
        <Image src={line} alt='선' className={styles.line} />
        <div className={styles.heart}>
          <Image
            src={favorite ? heartFullIcon : heartIcon}
            alt='하트 아이콘'
            width={26.8}
            height={23.3}
            onClick={() => handleFavorite(articleId, category)}
          />
          <span className={styles.heartCount}>{favoriteCount}</span>
        </div>
      </div>
      <div className={styles.content}>{article.content}</div>
      <div>{article.images}</div>
      {/* <Image src={article.image} width={150} height={150} alt='이미지' /> */}
    </>
  );
}
