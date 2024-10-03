import { ImageContainer } from "./ImgContainers";
import assets from "@/variables/images";

const { defaultProfile } = assets.images;

export default function ProfileImg({ width = "24px", src }) {
  return (
    <ImageContainer src={src || defaultProfile} width={width} radius="50%" />
  );
}
