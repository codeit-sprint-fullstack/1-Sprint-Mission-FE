"use client";

import { useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/api-codeit-product";

import style from "./dropdown-kebab-article.module.css";

const dropdownContext = createContext();

// 임시로 article에서 사용한 kebab button 코드 복사
// 코드 통합 고려 필요
export function DropdownItem({ onClick, children }) {
  const { setIsOpened } = useContext(dropdownContext);

  let dropdownItemClass = `flex flex-column font-normal items-center justify-center ${style["dropdown-kebab-article-item"]}`;

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

export function DropDownKebabProduct({ productId }) {
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleModifyArticle = () => {
    router.push(`/product-edit/${productId}`);
  };

  const handleDeleteArticle = () => {
    deleteProduct(productId)
      .then((data) => {
        router.push(`/items`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <dropdownContext.Provider value={{ isOpened, setIsOpened, toggleDropdown }}>
      <div className={style["dropdown-kebab-article"]}>
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

export default DropDownKebabProduct;
