import { useEffect, useRef, useState } from "react";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";

export function useChat(userId: string) {
  const { data: session } = useSession();
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const utils = api.useUtils();

  const { data, fetchNextPage, hasNextPage } =
    api.chat.getMessages.useInfiniteQuery(
      {
        userId,
        limit: 50,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const messages = data?.pages.flatMap((page) => page.messages) ?? [];

  const sendMessageMutation = api.chat.sendMessage.useMutation({
    onSuccess: (newMessage) => {
      utils.chat.getMessages.setInfiniteData({ userId, limit: 50 }, (old) => {
        if (!old)
          return {
            pages: [{ messages: [newMessage], nextCursor: undefined }],
            pageParams: [],
          };

        const newPages = old.pages.map((page, i) => {
          if (i === 0) {
            return {
              ...page,
              messages: [newMessage, ...page.messages],
            };
          }
          return page;
        });

        return {
          ...old,
          pages: newPages,
        };
      });
    },
  });

  useEffect(() => {
    if (!session?.user?.email || !userId) return;

    const ws = new WebSocket(`ws://localhost:3001/ws`);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(
        JSON.stringify({
          type: "auth",
          userId: session.user.id,
        }),
      );
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (
        message.type === "chat" &&
        (message.senderId === userId || message.recipientId === userId)
      ) {
        utils.chat.getMessages.setInfiniteData({ userId, limit: 50 }, (old) => {
          if (!old)
            return {
              pages: [{ messages: [message], nextCursor: undefined }],
              pageParams: [],
            };

          const newPages = old.pages.map((page, i) => {
            if (i === 0) {
              return {
                ...page,
                messages: [message, ...page.messages],
              };
            }
            return page;
          });

          return {
            ...old,
            pages: newPages,
          };
        });
      }
    };

    ws.onclose = () => setIsConnected(false);

    return () => {
      ws.close();
    };
  }, [userId, session?.user?.email]);

  const sendMessage = (content: string) => {
    sendMessageMutation.mutate({
      recipientId: userId,
      content,
    });

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          recipientId: userId,
          content,
        }),
      );
    }
  };

  return {
    messages,
    sendMessage,
    isConnecting: !isConnected,
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
  };
}
