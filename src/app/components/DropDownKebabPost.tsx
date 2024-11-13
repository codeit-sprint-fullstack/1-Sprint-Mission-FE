"use client";

import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "src/lib/api-post";

import style from "./dropdown-kebab-post.module.css";

interface DropdownItemProps {
  onClick: Function;
  children: ReactNode;
}

interface DropdownMenuProps {
  onModify: Function;
  onDelete: Function;
}

interface DropdownContextType {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

interface DropdownProviderProps {
  children: ReactNode;
}

function DropdownProvider({ children }: DropdownProviderProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <DropdownContext.Provider value={{ isOpened, setIsOpened }}>
      {children}
    </DropdownContext.Provider>
  );
}

function useDropdownContext(): DropdownContextType {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdownContext must be used within a DropdownProvider"
    );
  }
  return context;
}

export function DropdownItem({ onClick, children }: DropdownItemProps) {
  const { setIsOpened } = useDropdownContext();

  let dropdownItemClass = `flex-col font-normal items-center justify-center ${style["dropdown-kebab-post-item"]}`;

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

export function DropdownMenu({ onModify, onDelete }: DropdownMenuProps) {
  const { isOpened } = useDropdownContext();

  let dropdownMenuClass = `${style["dropdown-kebab-post-menu"]}`;

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

export function DropDownKebabPost({ postId }: { postId: string }) {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  const handleModifyPost = () => {
    router.push(`/post-edit/${postId}`);
  };

  const handledeletePost = () => {
    deletePost(postId).then((data) => {
      router.push(`/bulletin-board`);
    });
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
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
    <DropdownProvider>
      <div className={style["dropdown-kebab-post"]} ref={dropdownRef}>
        <button
          className={style["dropdown-kebab-post-toggle"]}
          onClick={toggleDropdown}
        />
        {isOpened && (
          <DropdownMenu
            onModify={handleModifyPost}
            onDelete={handledeletePost}
          />
        )}
      </div>
    </DropdownProvider>
  );
}

export default DropDownKebabPost;
