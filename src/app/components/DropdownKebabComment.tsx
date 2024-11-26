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
import useAuth from "../hooks/useAuth";

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

// 임시로 post에서 사용한 kebab button 코드 복사
// 코드 통합 고려 필요
export function DropdownItem({ onClick, children }: DropdownItemProps) {
  const { setIsOpened } = useDropdownContext();

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

export function DropdownMenu({ onModify, onDelete }: DropdownMenuProps) {
  const { isOpened } = useDropdownContext();

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

export function DropDownKebabComment({
  commentId,
  ownerId,
  onModify,
  onDelete,
}: DropdownMenuProps & { commentId: string; ownerId: string }) {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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

  const handleModifyPost = () => {
    onModify();
  };

  const handledeletePost = () => {
    onDelete();
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
      <div className="dropdown-kebab" ref={dropdownRef}>
        <button className="dropdown-kebab__toggle" onClick={toggleDropdown} />
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

export default DropDownKebabComment;
