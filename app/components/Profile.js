import Image from "next/image";

import style from "@/app/components/profile.module.css";

import { HEADER_PROFILE, POST_PREVIEW_PROFILE } from "../constants/Profile";

export function Profile({ type, profileImgUrl, onClick }) {
  const clickProfile = () => onClick();

  let profile = undefined;

  // 임시로 고정 프로필 이미지 설정
  if (!profileImgUrl) {
    profileImgUrl = "icons/ic_profile40.svg";
  }

  switch (type) {
    case HEADER_PROFILE: {
      profile = (
        <div className={style["header-profile"]} onClick={clickProfile}>
          <Image src={profileImgUrl} fill={true} alt="프로필 사진" />
        </div>
      );
      break;
    }
    case POST_PREVIEW_PROFILE: {
      profile = (
        <div className={style["post-preview-profile"]} onClick={clickProfile}>
          <Image src={profileImgUrl} fill={true} alt="프로필 사진" />
        </div>
      );
      break;
    }
  }

  return profile;
}

export default Profile;
