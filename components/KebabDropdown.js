import { useRef, useState, useEffect } from 'react';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import styles from './KebabDropdown.module.css';
import Image from 'next/image';
import kebabMenu from '@/public/ic_kebab.svg';
import Button from './Button';

export default function kebabDropdown({
  initialTitle = '',
  initialContent = '',
  onSave,
  onDelete,
  isPost,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); // 수정 모달 상태
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // 삭제 모달 상태

  const dropdownRef = useRef(null);

  // 드롭다운 외부를 클릭하면 닫히는 로직
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // 드롭다운 열기/닫기
  const toggleDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 수정 모달 열기
  const openUpdateModal = () => {
    setIsMenuOpen(false); // 드롭다운 닫기
    setUpdateModalOpen(true); // 수정 모달 열기
  };

  // 수정 모달 닫기
  const closeModal = () => {
    setUpdateModalOpen(false); // 모달 닫기
  };

  // 수정된 내용 저장
  const handleSave = (updatedData) => {
    onSave(updatedData); // 부모에게 저장된 내용 전달
    closeModal(); // 모달 닫기
  };

  // 삭제 모달 열기
  const openDeleteModal = () => {
    setIsMenuOpen(false); // 메뉴 닫기
    setDeleteModalOpen(true); // 삭제 모달 열기
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // 삭제 확정 처리
  const confirmDelete = () => {
    onDelete(); // 삭제 함수 실행
    closeDeleteModal(); // 모달 닫기
  };

  return (
    <>
      <div className={styles.kebabDropdown} ref={dropdownRef}>
        <div className={styles.kebabMenuWrapper}>
          <Image src={kebabMenu} alt="케밥 메뉴 이미지" onClick={toggleDropdown} />
        </div>
        {isMenuOpen && (
          <div className={styles.menu}>
            <Button name="수정하기" onClick={openUpdateModal} className={styles.item} />
            <Button name="삭제하기" onClick={openDeleteModal} className={styles.item} />
          </div>
        )}

        {isUpdateModalOpen && (
          <UpdateModal
            title={initialTitle} // 초기 제목 전달 (게시글일 경우만 사용)
            content={initialContent} // 초기 내용 전달
            onClose={closeModal} // 모달 닫기 함수
            onSave={handleSave} // 저장 함수
            isPost={isPost} // 게시글일 경우 제목 수정 가능
          />
        )}

        {isDeleteModalOpen && (
          <DeleteModal isPost={isPost} onClose={closeDeleteModal} onDelete={confirmDelete} />
        )}
      </div>
    </>
  );
}
