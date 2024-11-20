"use client";

import { api } from "@/app/_trpc/client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ChatListPage() {
  const { data: session, status } = useSession();
  const {
    data: chats,
    isLoading,
    error,
  } = api.chat.getRecentChats.useQuery(undefined, {
    enabled: status === "authenticated",
    retry: 1,
    onError: (err) => {
      console.error("Chat query error:", err);
    },
  });

  console.log("Session status:", status);
  console.log("Session data:", session);

  if (status === "loading") {
    return <div>세션 로딩 중...</div>;
  }

  if (status === "unauthenticated") {
    return <div>로그인이 필요합니다.</div>;
  }

  if (isLoading) {
    return <div>채팅 목록을 불러오는 중...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!chats || chats.length === 0) {
    return (
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">채팅 목록</h1>
        <p className="text-gray-500">아직 채팅이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">채팅 목록</h1>
      <div className="space-y-4">
        {chats.map((chat) => (
          <Link
            key={chat.user.id}
            href={`/chat/${chat.user.id}`}
            className="block rounded-lg border p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              {chat.user.image && (
                <img
                  src={chat.user.image}
                  alt={chat.user.name || ""}
                  className="h-12 w-12 rounded-full"
                />
              )}
              <div>
                <h2 className="font-semibold">{chat.user.name}</h2>
                <p className="text-sm text-gray-500">
                  {chat.lastMessage.content}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(chat.lastMessage.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
