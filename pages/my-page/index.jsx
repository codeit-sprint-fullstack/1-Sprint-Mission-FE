import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthProvider";

export default function MyPage() {
  const { user, logOut } = useAuth(true);

  return (
    <>
      <div>닉네임: {user?.nickname}</div>
      <Button variant="primary" onClick={logOut}>
        로그아웃
      </Button>
    </>
  );
}
