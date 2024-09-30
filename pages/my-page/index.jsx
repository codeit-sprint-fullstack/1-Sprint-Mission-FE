import UploadImageForm from "@/components/form/UploadImagesForm";
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
      <br />
      <br />
      <h2>이미지 업로드해서 url 받기</h2>
      <UploadImageForm />
    </>
  );
}
