"use client";

import {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import useAuth from "src/app/hooks/useAuth";
import { deleteProduct } from "src/lib/api-product";

import DeleteModal from "src/app/components/DeleteModal";

interface DropdownContextProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDropdown: () => void;
}

const dropdownContext = createContext<DropdownContextProps | undefined>(
  undefined
);

interface DropdownItemProps {
  onClick: () => void;
  children: ReactNode;
}

interface DropdownMenuProps {
  onModify: () => void;
  onDelete: () => void;
}

interface DropDownKebabProductProps {
  productId: string;
  ownerId: string;
}

// 임시로 post에서 사용한 kebab button 코드 복사
// 코드 통합 고려 필요
export function DropdownItem({ onClick, children }: DropdownItemProps) {
  const context = useContext(dropdownContext);
  if (!context) throw new Error("DropdownItem must be used within Dropdown");

  const { setIsOpened } = context;

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
  const context = useContext(dropdownContext);
  if (!context) throw new Error("DropdownMenu must be used within Dropdown");

  const { isOpened } = context;

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

export function DropDownKebabProduct({
  productId,
  ownerId,
}: DropDownKebabProductProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { userId } = useAuth();
  const router = useRouter();

  const toggleDropdown = () => {
    if (userId === ownerId) {
      setIsOpened(!isOpened);
    } else {
      alert("임시 처리 : 권한이 없습니다");
    }
  };

  const handleModifyProduct = () => {
    router.push(`/product-edit/${productId}`);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleDeleteProduct = () => {
    deleteProduct(productId)
      .then((data) => {
        router.push(`/items`);
      })
      .catch((err) => {
        console.error(err);
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
    <>
      <dropdownContext.Provider
        value={{ isOpened, setIsOpened, toggleDropdown }}
      >
        <div className="dropdown-kebab" ref={dropdownRef}>
          <button className="dropdown-kebab__toggle" onClick={toggleDropdown} />
          {isOpened && (
            <DropdownMenu
              onModify={handleModifyProduct}
              onDelete={handleShowModal}
            />
          )}
        </div>
      </dropdownContext.Provider>
      <DeleteModal
        showModal={showModal}
        deleteModal={handleDeleteProduct}
        onClose={handleHideModal}
      />
    </>
  );
}

export default DropDownKebabProduct;
