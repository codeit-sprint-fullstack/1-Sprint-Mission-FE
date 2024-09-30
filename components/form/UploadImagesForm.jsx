import { createImageUrl } from "@/service/api/user";
import { useMutation } from "@tanstack/react-query";
import Button from "../ui/Button";
import { useState } from "react";

export default function UploadImageForm() {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { mutate } = useMutation({
    mutationFn: (data) => createImageUrl(data),
    onSuccess: (data) => {
      if (data && data.url) {
        console.log("successMutation: upload image");
        setImageUrl(data.url);
        console.log("image url:", data.url);
      } else {
        console.log("데이터에 url없나봄");
      }
    },
  });

  const handleChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      mutate(formData);
    } else {
      console.log("이미지 파일 없나봄");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <Button type="submit">이미지 업로드</Button>
      </form>
      {imageUrl && <p>복사할 주소: {imageUrl}</p>}
    </>
  );
}
