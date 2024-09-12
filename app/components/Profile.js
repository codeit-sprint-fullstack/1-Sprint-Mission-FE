import Image from "next/image";

import style from "@/app/components/profile.module.css";

import { PROFILE_H40, PROFILE_H32, PROFILE_H24 } from "../constants/Profile";

export function Profile({ type, profileImgUrl, onClick }) {
  const clickProfile = () => onClick();
  const h40Class = `${style.h40} ${style.profile}`;
  const h32Class = `${style.h32} ${style.profile}`;
  const h24Class = `${style.h24} ${style.profile}`;

  let profile = undefined;

  // 임시로 고정 프로필 이미지 설정
  if (!profileImgUrl) {
    profileImgUrl = "/icons/ic_profile40.svg";
  }

  switch (type) {
    case PROFILE_H40: {
      profile = (
        <div className={h40Class} onClick={clickProfile}>
          <Image src={profileImgUrl} sizes="100vw" fill alt="프로필 사진" />
        </div>
      );
      break;
    }
    case PROFILE_H32: {
      profile = (
        <div className={h32Class} onClick={clickProfile}>
          <Image src={profileImgUrl} sizes="100vw" fill alt="프로필 사진" />
        </div>
      );
      break;
    }
    case PROFILE_H24: {
      profile = (
        <div className={h24Class} onClick={clickProfile}>
          <Image src={profileImgUrl} sizes="100vw" fill alt="프로필 사진" />
        </div>
      );
      break;
    }
  }

  return profile;
}

export default Profile;
