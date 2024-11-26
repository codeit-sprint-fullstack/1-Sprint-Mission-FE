"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface PostUserProfileProps {
  imgUrl: string;
}

export default function PostUserProfile({ imgUrl }: PostUserProfileProps) {
  const [validImg, setValidImg] = useState("/icons/ic_profile40.svg");

  useEffect(() => {
    const image = new window.Image();

    const handleImgLoad = () => {
      setValidImg(imgUrl);
    };
    const handleImgError = () => {
      setValidImg("/icons/ic_profile40.svg");
    };

    image.src = imgUrl;
    image.onload = handleImgLoad;
    image.onerror = handleImgError;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [imgUrl]);

  return <Image src={validImg} alt="작성자 프로필 이미지" fill />;
}
