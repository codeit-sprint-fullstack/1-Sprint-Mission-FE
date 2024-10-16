import styles from "./InputFields.module.scss";
import Image from "next/image";
import { IconContainer } from "@/components/ui/ImgContainers";
import assets from "@/variables/images";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

export default function InputFile({ name, initialImages = [], isSubmit }) {
  const {
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const [imageUrls, setImageUrls] = useState(initialImages);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  const fileField = "imageFiles";
  const urlField = "imageUrls";

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files || files.length === 0) {
      console.log("이미지 파일 없음");
      return;
    }

    const newImageUrls = files.map((file) => URL.createObjectURL(file));

    const totalImages =
      imageUrls.length + newImageUrls.length + previewUrls.length;
    console.log("Total images:", totalImages);
    console.log("Image URLs:", imageUrls);
    console.log("Preview URLs:", previewUrls);

    if (totalImages > 3) {
      setError(name, {
        type: "manual",
        message: "*이미지 등록은 최대 3개 까지 가능합니다.",
      });

      setTimeout(() => {
        clearErrors(name);
      }, 3000);

      return;
    } else if (totalImages === 0) {
      setError(name, {
        type: "manual",
        message: "*최소 이미지 1개 등록해주세요.",
      });
      return;
    } else {
      clearErrors(name);
    }

    setPreviewUrls((prev) => {
      const updatedPreviewUrls = [...prev, ...newImageUrls];
      console.log("Updated Preview URLs:", updatedPreviewUrls);
      return updatedPreviewUrls;
    });
    setNewFiles((prev) => {
      const updatedFiles = [...prev, ...files];
      setValue(fileField, updatedFiles);
      return updatedFiles;
    });

    clearErrors(name);
  };

  const removeImage = (imageToDelete) => {
    let updatedImageUrls = [...imageUrls];

    if (imageUrls.includes(imageToDelete)) {
      updatedImageUrls = imageUrls.filter((image) => image !== imageToDelete);
      setImageUrls(updatedImageUrls);
      setValue(urlField, updatedImageUrls);
      console.log("Updated image URLs:", updatedImageUrls);
      return;
    }

    const updatedPreviewUrls = previewUrls.filter(
      (image) => image !== imageToDelete
    );
    const imageIndex = previewUrls.indexOf(imageToDelete);
    const updatedFiles = newFiles.filter((_, i) => i !== imageIndex);

    setPreviewUrls(updatedPreviewUrls);
    setNewFiles(updatedFiles);

    setValue(fileField, updatedFiles);
    console.log("Updated preview URLs:", updatedPreviewUrls);
    console.log("Updated new files:", updatedFiles);

    if (updatedImageUrls.length + updatedPreviewUrls.length > 3) {
      setError(name, {
        type: "manual",
        message: "*이미지 등록은 최대 3개 까지 가능합니다.",
      });
      return;
    } else {
      clearErrors(name);
    }
  };

  useEffect(() => {
    if (isSubmit) {
      setPreviewUrls([]);
    }
  }, [isSubmit]);

  return (
    <>
      <div className={styles.InputFile}>
        <label className={styles["input-file-area"]}>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className={styles["input-file"]}
            name={name}
            multiple
          />
          <div className={styles["input-plus-icons"]}>
            <IconContainer
              src={assets.icons.plus}
              alt="add button"
              width="48px"
            />
            <span className={styles.text}>이미지 등록</span>
          </div>
        </label>

        {imageUrls.map((image) => (
          <div key={image} className={styles["preview-img"]}>
            <img src={image} alt="preview image" />

            <button
              className={styles["close-btn"]}
              type="button"
              onClick={() => removeImage(image)}
            >
              <Image
                src={assets.icons.x}
                alt="close icon"
                width={22}
                height={24}
              />
            </button>
          </div>
        ))}

        {previewUrls.map((image) => (
          <div key={image} className={styles["preview-img"]}>
            <img src={image} alt="preview image" />

            <button
              className={styles["close-btn"]}
              type="button"
              onClick={() => removeImage(image)}
            >
              <Image
                src={assets.icons.x}
                alt="close icon"
                width={22}
                height={24}
              />
            </button>
          </div>
        ))}
        {errors && errors[name] && (
          <span className={styles["error-text"]}>{errors[name].message}</span>
        )}
      </div>
    </>
  );
}
