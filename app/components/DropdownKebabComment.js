"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

const dropdownContext = createContext();

// 임시로 article에서 사용한 kebab button 코드 복사
// 코드 통합 고려 필요
export function DropdownItem({ onClick, children }) {
  const { setIsOpened } = useContext(dropdownContext);

  const onItemClick = () => {
    setIsOpened(false);
    onClick();
  };

  return (
    <div className="dropdown-kebab__item" onClick={onItemClick}>
      {children}
    </div>
  );
}

export function DropdownMenu({ onModify, onDelete }) {
  const { isOpened } = useContext(dropdownContext);

  const handleClickModify = () => {
    onModify();
  };
  const handleClickDelete = () => {
    onDelete();
  };

  return (
    isOpened && (
      <div className="dropdown-kebab__menu">
        <DropdownItem onClick={handleClickModify}>수정하기</DropdownItem>
        <DropdownItem onClick={handleClickDelete}>삭제하기</DropdownItem>
      </div>
    )
  );
}

export function DropDownKebabComment({ ownerId, onModify, onDelete }) {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef(null);
  const { userId } = useAuth();

  // 토큰 만료시 sign-in 으로 이동을 위한 코드용
  // const router = useRouter();

  const toggleDropdown = () => {
    if (userId === ownerId) {
      setIsOpened(!isOpened);
    } else {
      alert("임시 처리 : 권한이 없습니다");
    }
  };

  const handleModifyArticle = () => {
    onModify();
  };

  const handleDeleteArticle = () => {
    onDelete();
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <dropdownContext.Provider value={{ isOpened, setIsOpened, toggleDropdown }}>
      <div className="dropdown-kebab" ref={dropdownRef}>
        <button className="dropdown-kebab__toggle" onClick={toggleDropdown} />
        {isOpened && (
          <DropdownMenu
            onModify={handleModifyArticle}
            onDelete={handleDeleteArticle}
          />
        )}
      </div>
    </dropdownContext.Provider>
  );
}

export default DropDownKebabComment;
