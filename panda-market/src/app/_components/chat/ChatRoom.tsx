"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/app/_hooks/useChat";

interface ChatRoomProps {
  userId: string;
  userName: string;
}

export function ChatRoom({ userId, userName }: ChatRoomProps) {
  const { messages, sendMessage, isConnecting, loadMore, hasMore } =
    useChat(userId);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || isConnecting) return;

    sendMessage(newMessage.trim());
    setNewMessage("");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="font-bold">{userName}</h2>
        {isConnecting && <p className="text-sm text-gray-500">연결 중...</p>}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {hasMore && (
          <button
            onClick={() => loadMore()}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
          >
            이전 메시지 불러오기
          </button>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === userId ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === userId
                  ? "bg-gray-100"
                  : "bg-blue-500 text-white"
              }`}
            >
              {message.content}
              <div
                className={`mt-1 text-xs ${
                  message.senderId === userId
                    ? "text-gray-500"
                    : "text-blue-100"
                }`}
              >
                {new Date(message.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 rounded-lg border p-2"
            placeholder="메시지를 입력하세요..."
          />
          <button
            onClick={handleSend}
            disabled={isConnecting}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
