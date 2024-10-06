"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { deleteArticle } from "@/lib/axios";

import style from "./dropdown-kebab-article.module.css";

const dropdownContext = createContext();

export function DropdownItem({ onClick, children }) {
  const { setIsOpened } = useContext(dropdownContext);

  let dropdownItemClass = `flex-col font-normal items-center justify-center ${style["dropdown-kebab-article-item"]}`;

  const onItemClick = () => {
    setIsOpened(false);
    onClick();
  };

  return (
    <div className={dropdownItemClass} onClick={onItemClick}>
      {children}
    </div>
  );
}

export function DropdownMenu({ onModify, onDelete }) {
  const { isOpened } = useContext(dropdownContext);

  let dropdownMenuClass = `${style["dropdown-kebab-article-menu"]}`;

  const handleClickModify = () => {
    onModify();
  };
  const handleClickDelete = () => {
    onDelete();
  };

  return (
    isOpened && (
      <div className={dropdownMenuClass}>
        <DropdownItem onClick={handleClickModify}>수정하기</DropdownItem>
        <DropdownItem onClick={handleClickDelete}>삭제하기</DropdownItem>
      </div>
    )
  );
}

export function DropDownKebabArticle({ articleId }) {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleModifyArticle = () => {
    router.push(`/article-edit/${articleId}`);
  };

  const handleDeleteArticle = () => {
    deleteArticle(articleId).then((data) => {
      router.push(`/bulletin-board`);
    });
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
      <div className={style["dropdown-kebab-article"]} ref={dropdownRef}>
        <button
          className={style["dropdown-kebab-article-toggle"]}
          onClick={toggleDropdown}
        />
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

export default DropDownKebabArticle;
