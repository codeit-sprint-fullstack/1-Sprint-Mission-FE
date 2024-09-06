import dynamic from "next/dynamic";

const ChatItemClient = dynamic(() => import("@/components/ChatItem"), {
  ssr: false,
});

export default ChatItemClient;
