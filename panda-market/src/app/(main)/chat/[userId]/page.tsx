import ChatRoom from "./ChatRoom";

export default function ChatPage({ params }: { params: { userId: string } }) {
  return (
    <div className="container mx-auto">
      <ChatRoom userId={params.userId} />
    </div>
  );
}

// sendMessage mutation 응답 / 웹소켓 메세지 ID 중복으로 동일키 두개 렌더링되는 문제있음
// limit설정 추가적으로 필요해보임
//
