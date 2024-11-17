"use client";

import { api } from "@/app/_trpc/client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import type { Message, ChatResponse } from "@/app/_types/chat";

interface ChatRoomProps {
  userId: string;
}

interface WebSocketMessage {
  id: string;
  content: string;
  senderId: string;
  createdAt: string | Date;
}

export default function ChatRoom({ userId }: ChatRoomProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const utils = api.useContext();
  const wsRef = useRef<WebSocket | null>(null);

  const { data: chats, isLoading } = api.chat.getMessages.useQuery(
    {
      userId,
      limit: 50,
    },
    {
      enabled: status === "authenticated",
    },
  ) as { data: ChatResponse | undefined; isLoading: boolean };

  useEffect(() => {
    if (!session?.user?.id) return;

    const ws = new WebSocket("ws://localhost:3001/websocket");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data) as WebSocketMessage;

      if (!newMessage.content || !newMessage.senderId) {
        return;
      }

      if (
        newMessage.senderId === userId ||
        newMessage.senderId === session.user?.id
      ) {
        utils.chat.getMessages.setData({ userId, limit: 50 }, (old) => {
          if (!old) {
            return {
              messages: [],
              nextCursor: undefined,
            };
          }

          const isDuplicate = old.messages.some(
            (msg) => msg.id === newMessage.id,
          );

          if (isDuplicate) return old;

          const sessionUser: User = {
            id: session.user?.id ?? "",
            name: session.user?.name ?? null,
            image: session.user?.image ?? null,
          };

          const otherUser: User = {
            id: userId,
            name: null,
            image: null,
          };

          const messageToAdd: Message = {
            id: newMessage.id,
            content: newMessage.content,
            senderId: newMessage.senderId,
            // TODO: 타입개선
            recipientId:
              newMessage.senderId === userId ? sessionUser.id : userId,
            createdAt: new Date(newMessage.createdAt),
            sender:
              newMessage.senderId === sessionUser.id ? sessionUser : otherUser,
            recipient: newMessage.senderId === userId ? sessionUser : otherUser,
          };

          return {
            messages: [...old.messages, messageToAdd].sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            ),
            nextCursor: old.nextCursor,
          };
        });
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      ws.close();
    };
  }, [session?.user, userId, utils]);

  const sendMessageMutation = api.chat.sendMessage.useMutation({
    onSuccess: (sentMessage) => {
      setMessage("");
      setError(null);

      if (wsRef.current?.readyState === WebSocket.OPEN && session?.user) {
        const messageToSend: WebSocketMessage = {
          id: sentMessage.id,
          content: sentMessage.content,
          senderId: session.user.id,
          createdAt: sentMessage.createdAt,
        };
        console.log("Sending message:", messageToSend);
        wsRef.current.send(JSON.stringify(messageToSend));
      }
    },
    onError: (err) => {
      setError(err.message);
      console.error("Failed to send message:", err);
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!message.trim()) {
      setError("메시지를 입력해주세요.");
      return;
    }

    sendMessageMutation.mutate({
      recipientId: userId,
      content: message.trim(),
    });
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats?.messages]);

  if (status === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please login to send messages.</div>;
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {error && (
          <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {chats?.messages.map((chat) => {
          const messageKey = `${chat.id}-${chat.createdAt}`;
          return (
            <div
              key={messageKey}
              className={`flex ${
                chat.senderId === session?.user?.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  chat.senderId === session?.user?.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                <p>{chat.content}</p>
                <p className="mt-1 text-xs opacity-70">
                  {new Date(chat.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-lg border p-2"
            placeholder="메시지를 입력하세요..."
            disabled={sendMessageMutation.isLoading}
          />
          <button
            type="submit"
            disabled={sendMessageMutation.isLoading}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
          >
            {sendMessageMutation.isLoading ? "전송 중..." : "전송"}
          </button>
        </div>
      </form>
    </div>
  );
}
