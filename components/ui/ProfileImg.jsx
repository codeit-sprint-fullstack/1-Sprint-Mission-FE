import ImageContainer from "./ImgContainer";

const defaultProfileImg = "/assets/img_default_profile.svg";

export default function ProfileImg({ width = "24px", src }) {
  return (
    <ImageContainer
      src={src || defaultProfileImg}
      width={width}
      height={width}
      radius="50%"
    />
  );
}
