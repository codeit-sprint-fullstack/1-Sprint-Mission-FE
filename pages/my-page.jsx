import { useAuth } from "@/context/AuthProvider";

export default function MyPage() {
  const { user } = useAuth(true);

  return <div>{user}</div>;
}
