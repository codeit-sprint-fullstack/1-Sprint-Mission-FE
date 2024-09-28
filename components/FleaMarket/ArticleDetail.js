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

import TestImage from '@/public/testImage.png';
import styles from '@/styles/ArticleDetail.module.css';
import { useEditArticle } from '@/hooks/useFreeBoard';
import { useFleaMarketEditArticle } from '@/hooks/useFleaMarket';

export default function ArticleDetailInfo({
  article,
  category,
  handleDeleteArticle,
}) {
  const [openOptions, setOpenOptions] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(article?.favorite || 0);
  const router = useRouter();
  const { id } = router.query;

  let formattedPrice = article?.price
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

  // useCallback 사용

  const handleDropDown = useCallback(() => {
    setOpenOptions((prev) => !prev);
  }, []);

  const { deleteArticle } = useEditArticle({ id });
  const { deleteFleaMArketArticle } = useFleaMarketEditArticle({ id });

  const buttonEvent = () => {
    if (confirm('정말 삭제하시겠습니까??') === true) {
      try {
        if (category === 'freeboard') {
          deleteArticle(id);
          router.push('/freeboard');
        } else {
          deleteFleaMArketArticle(id);
          router.push('/fleamarket');
        }
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    } else {
      return;
    }
  };

  const handleFavorite = () => {
    setFavorite((prev) => !prev);
    if (favorite === false) {
      setFavoriteCount((prev) => Math.max(prev + 1, 0));
    } else {
      setFavoriteCount((prev) => Math.max(prev - 1, 0));
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
      <div className={styles.layout}>
        <Image
          src={TestImage}
          width={486}
          height={486}
          alt='이미지'
          className={styles.itemImage}
        />
        <div className={styles.information}>
          <div className={styles.titleOption}>
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
          <div className={styles.itemPrice}>{formattedPrice}원</div>
        </div>
        <div className={styles.itemInformation}>
          <div className={styles.itemTitleText}>상품 소개</div>
          <div className={styles.itemContent}>
            <pre>{article.content} </pre>
          </div>

          <div className={styles.itemTitleText}>상품 태그</div>
          {article.tags.map((tag, index) => (
            <li key={index} className={styles.hashtags}>
              <span className={styles.hashtagTitle}># {tag}</span>
            </li>
          ))}
        </div>

        <div className={styles.profile}>
          <div className={styles.userInfo}>
            <Image src={profileIcon} alt='프로필 사진' width={40} height={40} />
            <div className={styles.articleInfo}>
              <p className={styles.userName}>{article.user.name}</p>
              <span className={styles.date}>
                <DateFormat
                  createDate={article}
                  className={styles.profileIcon}
                />
              </span>
            </div>
          </div>
          <div className={styles.heartCount}>
            <Image src={line} alt='선' className={styles.line} />
            <div className={styles.heart}>
              <Image
                src={favorite ? heartFullIcon : heartIcon}
                width={26.8}
                height={23.3}
                alt='하트 아이콘'
                className={styles.heartIcon}
                onClick={handleFavorite}
              />
              <span className={styles.heartCount}>{favoriteCount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
