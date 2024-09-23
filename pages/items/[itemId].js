import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../../lib/axios";
import Link from "next/link";
import Modal from "../../components/Modal";
import styles from "../../styles/ItemDetail.module.css";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const ItemDetail = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({ title: "", description: "" });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // 로그인하지 않은 경우, 로그인 페이지로 리다이렉트
      router.push(`/login?redirectTo=/items/${itemId}`);
      return;
    }

    if (itemId) {
      fetchItemDetails();
    }
  }, [itemId]);

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`/products/${itemId}`);
      setItem(response.data);
      setComments(response.data.comments);
    } catch (error) {
      console.error("상품 상세 조회 실패:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${itemId}`);
      router.push("/items");
    } catch (error) {
      console.error("상품 삭제 실패:", error);
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

  const handleUnfavorite = async () => {
    try {
      await axios.delete(`/products/${itemId}/favorite`);
      fetchItemDetails();
    } catch (error) {
      console.error("좋아요 취소 실패:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/products/${itemId}`, editData);
      fetchItemDetails();
      setIsEditMode(false);
    } catch (error) {
      console.error("상품 수정 실패:", error);
    }
  };

  if (!item) return <div>로딩 중...</div>;

  return (
    <div>
      <Nav />
      <div className={styles.container}>
        {isEditMode ? (
          <div>
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
            <button className={styles.button} onClick={handleEdit}>
              저장
            </button>
            <button
              className={styles.button}
              onClick={() => setIsEditMode(false)}
            >
              취소
            </button>
          </div>
        ) : (
          <div>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.description}>{item.description}</p>
            <button
              className={styles.button}
              onClick={() => router.push("/items")}
            >
              목록으로 돌아가기
            </button>
            <button
              className={styles.button}
              onClick={() => setIsModalOpen(true)}
            >
              삭제
            </button>
            <button
              className={styles.button}
              onClick={() => setIsEditMode(true)}
            >
              수정
            </button>
            <button className={styles.button} onClick={handleFavorite}>
              좋아요
            </button>
            <button className={styles.button} onClick={handleUnfavorite}>
              좋아요 취소
            </button>
          </div>
        )}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <p>정말 삭제하시겠습니까?</p>
          <button className={styles.button} onClick={handleDelete}>
            삭제
          </button>
          <button
            className={styles.button}
            onClick={() => setIsModalOpen(false)}
          >
            취소
          </button>
        </Modal>
        <div>
          <h2>댓글</h2>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <p className={styles.commentText}>{comment.content}</p>
              {/* 댓글 수정 및 삭제 버튼 추가 */}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetail;
