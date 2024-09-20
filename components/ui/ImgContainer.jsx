import Image from "next/image";
import styles from "./ImgContainer.module.scss";

export default function ImageContainer({
  src,
  alt = "default image",
  width = "100%",
  height = "auto",
  radius = "4px",
  borderColor = "transparent",
  isPriority,
}) {
  return (
    <div
      className={styles.container}
      style={{
        "--width": width,
        "--height": height,
        "--radius": radius,
        "--border-color": borderColor,
      }}
    >
      <Image src={src} alt={alt} fill priority={isPriority} />
    </div>
  );
}
