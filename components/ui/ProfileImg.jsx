import defaultProfile from "../../public/assets/icons/ic_profile.svg";
import ImageContainer from "./ImgContainer";

export default function ProfileImg({ width = "24px", src }) {
  const profileImg = src || defaultProfile;

  return (
    <ImageContainer
      src={profileImg}
      width={width}
      height={width}
      radius="50%"
    />
  );
}
