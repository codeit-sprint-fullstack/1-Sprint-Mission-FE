import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "../../lib/axios";
import styles from "../../styles/ItemDetail.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const ItemDetail = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (itemId) {
      fetchItemDetails();
      fetchComments();
    }
  }, [itemId]);

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`/products/${itemId}`);
      setItem(response.data);
      setLoading(false);
    } catch (error) {
      console.error("상품 상세 정보 조회 실패:", error);
      setError("상품 정보를 불러오는데 실패했습니다.");
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/products/${itemId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글 조회 실패:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/products/${itemId}/comments`, { content: newComment });
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`/products/${itemId}/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const handleFavorite = async () => {
    try {
      await axios.post(`/products/${itemId}/favorite`);
      fetchItemDetails();
    } catch (error) {
      console.error("좋아요 실패:", error);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!item) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div>
      <Nav />
      <div className={styles.container}>
        <div className={styles.imageGallery}>
          <Image
            src={item.images[currentImageIndex]}
            alt={item.name}
            width={500}
            height={500}
            objectFit="cover"
          />
          <div className={styles.thumbnails}>
            {item.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${item.name} ${index + 1}`}
                width={100}
                height={100}
                objectFit="cover"
                onClick={() => setCurrentImageIndex(index)}
                className={
                  index === currentImageIndex ? styles.activeThumbnail : ""
                }
              />
            ))}
          </div>
        </div>
        <div className={styles.itemInfo}>
          <h1 className={styles.itemName}>{item.name}</h1>
          <p className={styles.itemPrice}>{item.price.toLocaleString()}원</p>
          <p className={styles.itemDescription}>{item.description}</p>
          <div className={styles.itemMeta}>
            <p>판매자: {item.seller}</p>
            <p>등록일: {new Date(item.createdAt).toLocaleDateString()}</p>
            <p>♥ {item.favoriteCount}</p>
          </div>
          <button onClick={handleFavorite} className={styles.favoriteButton}>
            좋아요
          </button>
          <div className={styles.itemTags}>
            {item.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.commentSection}>
          <h2>댓글</h2>
          <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요"
              className={styles.commentInput}
            />
            <button type="submit" className={styles.commentSubmit}>
              등록
            </button>
          </form>
          <div className={styles.comments}>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <p className={styles.commentContent}>{comment.content}</p>
                <p className={styles.commentMeta}>
                  {comment.author} -{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                  <button
                    onClick={() => handleCommentDelete(comment.id)}
                    className={styles.commentDelete}
                  >
                    삭제
                  </button>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetail;
