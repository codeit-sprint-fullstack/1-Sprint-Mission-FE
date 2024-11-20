"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SortDropdown, type SortOption } from "../common/SortDropdown";
import { AuthRequiredModal } from "../common/AuthRequireModal";
import type { Status } from "@prisma/client";

interface SearchSectionProps {
  status: Status | undefined;
  onStatusChange: (status: Status | undefined) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  defaultQuery?: string;
  onSearch: (query: string) => void;
}

export function SearchSection({
  sort,
  onSortChange,
  defaultQuery = "",
  onSearch,
}: SearchSectionProps) {
  const [inputValue, setInputValue] = useState(defaultQuery);
  const { data: session } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      setIsAuthModalOpen(true);
    }
  };

  const RegisterButton = () => (
    <Link
      href="/product/register"
      onClick={handleRegisterClick}
      className="flex h-11 items-center justify-center rounded-lg bg-blue-500 px-6 text-center text-white transition-colors hover:bg-blue-600"
    >
      상품 등록하기
    </Link>
  );

  return (
    <>
      <div className="w-full">
        <div className="mx-auto hidden items-center justify-between gap-2 tablet:flex">
          <h1 className="whitespace-nowrap text-xl font-bold">
            판매 중인 상품
          </h1>
          <div>
            <div className="flex flex-1 items-center gap-2">
              <form
                onSubmit={handleSubmit}
                className="flex flex-1 items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="검색할 상품을 입력해주세요"
                    className="h-11 w-full rounded-lg bg-secondary-100 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-[50%] h-5 w-5 -translate-y-[50%] text-secondary-400" />
                </div>
                <RegisterButton />
              </form>
              <SortDropdown value={sort} onChange={onSortChange} />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col tablet:hidden">
          <div className="flex items-center justify-between py-2">
            <h1 className="text-xl font-bold">판매 중인 상품</h1>
            <RegisterButton />
          </div>

          <div className="py-2">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="검색할 상품을 입력해주세요"
                  className="h-11 w-full rounded-lg bg-secondary-100 pl-10 pr-10 focus:outline-none"
                />
                <Search className="absolute left-3 top-[50%] h-5 w-5 -translate-y-[50%] text-secondary-400" />
              </div>
              <SortDropdown value={sort} onChange={onSortChange} />
            </form>
          </div>
        </div>
      </div>

      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        returnUrl="/product/register"
      />
    </>
  );
}
