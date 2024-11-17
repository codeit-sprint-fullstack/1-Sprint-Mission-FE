"use client";

import { X, Menu } from "lucide-react";
import SmallBtn from "../common/SmallBtn";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function GNB() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const pathname = usePathname();

  const isActive = (path: string) => pathname?.startsWith(path);

  const getLinkStyle = (path: string) => {
    const baseStyle = "text-6 px-4 py-5 font-bold";
    return `${baseStyle} ${
      isActive(path)
        ? "text-primary-100"
        : "text-secondary-600 hover:text-secondary-900"
    }`;
  };

  const getMobileLinkStyle = (path: string) => {
    const baseStyle = "block px-3 py-2 text-base font-medium";
    return `${baseStyle} ${
      isActive(path)
        ? "text-primary-100"
        : "text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900"
    }`;
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 tablet:px-6 pc:px-8">
        <div className="flex h-16 justify-between">
          {/* 로고쪽 */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <Image
                src="/images/logo-main.svg"
                width={153}
                height={51}
                alt="logo"
              />
            </Link>

            {isLoggedIn && (
              <div className="hidden tablet:flex tablet:items-center">
                <Link href="/product" className={getLinkStyle("/product")}>
                  중고거래
                </Link>
                <Link href="/community" className={getLinkStyle("/community")}>
                  동네생활
                </Link>
              </div>
            )}
          </div>

          {/* 오른쪽 */}
          <div className="hidden tablet:flex tablet:items-center tablet:space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center justify-center gap-[6px]">
                <Image
                  src="/icons/icon-user-profile.svg"
                  width={40}
                  height={40}
                  alt="프로필 사진"
                />
                <button
                  className="text-sm font-[400] text-secondary-600 hover:text-secondary-900"
                  onClick={() => signOut()}
                >
                  {session.user.name ?? "사용자"}
                </button>
              </div>
            ) : (
              <SmallBtn mode="40" href="/login">
                로그인
              </SmallBtn>
            )}
          </div>

          {/* 모바일 메뉴 버튼 - 로그인때 */}
          {isLoggedIn && (
            <div className="flex items-center tablet:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-secondary-400 hover:bg-secondary-100 hover:text-secondary-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              >
                <span className="sr-only">메뉴 열기</span>
                <Menu className={`${isOpen ? "hidden" : "block"} h-6 w-6`} />
                <X className={`${isOpen ? "block" : "hidden"} h-6 w-6`} />
                {/* 비로그인시 수정 필요 */}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 모바일 메뉴 - 로그인때 */}
      {isLoggedIn && (
        <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
          <div className="space-y-1 pb-3 pt-2">
            <Link
              href="/community"
              className={getMobileLinkStyle("/community")}
            >
              자유게시판
            </Link>
            <Link href="/product" className={getMobileLinkStyle("/product")}>
              중고마켓
            </Link>
            <button
              onClick={() => signOut()}
              className="block px-3 py-2 text-base font-medium text-error-red hover:bg-secondary-50 hover:text-secondary-900"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
