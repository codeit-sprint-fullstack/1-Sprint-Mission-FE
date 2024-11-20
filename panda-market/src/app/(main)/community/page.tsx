"use client";

import { type NextPage } from "next";
import { useState, type FormEvent } from "react";
import Head from "next/head";
import { Search } from "lucide-react";
import { api } from "@/app/_trpc/client";
import { PostCard } from "@/app/_components/post/PostCard";
import Button from "@/app/_components/common/SmallBtn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  SortDropdown,
  type SortOption,
} from "@/app/_components/common/SortDropdown";
import { AuthRequiredModal } from "@/app/_components/common/AuthRequireModal";
import BestPosts from "@/app/_components/post/BestPost";
import { Pagination } from "@/app/_components/common/Pagination";
import { LoaderWithContainer } from "@/app/_components/common/Loader";

const PostsPage: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortOption>("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { data, isLoading } = api.post.list.useQuery({
    page,
    limit: 5,
    sort,
    search: searchQuery,
  });

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWriteClick = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!session) {
      setIsAuthModalOpen(true);
    } else {
      router.push("/community/register");
    }
  };

  const handleModalClose = () => {
    setIsAuthModalOpen(false);
  };

  if (isLoading)
    return (
      <div>
        <LoaderWithContainer height="h-[300px]" />
      </div>
    );
  if (!data)
    return (
      <div>
        <LoaderWithContainer height="h-[300px]" />
      </div>
    );

  return (
    <>
      <Head>
        <title>게시판</title>
        <meta name="description" content="자유게시판" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <BestPosts />

        <div className="mb-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[20px] font-bold text-secondary-800">게시글</h1>
            <Button mode="40" onClick={handleWriteClick}>
              글쓰기
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="h-11 w-full rounded-lg bg-secondary-100 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-[50%] h-5 w-5 -translate-y-[50%] text-secondary-400" />
            </form>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {data.items.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />

        <AuthRequiredModal
          isOpen={isAuthModalOpen}
          onClose={handleModalClose}
          returnUrl="/community/register"
        />
      </main>
    </>
  );
};

export default PostsPage;
