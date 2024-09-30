import { useController, useFormContext } from "react-hook-form";
import styles from "./InputFields.module.scss";
import assets from "@/variables/images";
import { useState } from "react";
import Image from "next/image";

export default function TagInput({ name, label, validations }) {
  const [inputValue, setInputValue] = useState("");

  const { control, trigger, clearErrors } = useFormContext();

  const {
    field: { value: tags = [], onChange: updateTags, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      ...validations,
      validate: () => isTagDuplicate() || "이미 입력하신 태그입니다",
    },

    defaultValue: [],
  });

  const isTagDuplicate = (newTag) => {
    return tags.includes(newTag);
  };

  const addTag = () => {
    const newTag = inputValue;

    if (newTag !== "") {
      if (!isTagDuplicate(newTag)) {
        updateTags([...tags, newTag]);
        setInputValue("");
      } else {
        console.log("이미 입력한 태그임");
        trigger(name);
      }
    }
    console.log(newTag);
    console.log("tags", tags);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing && !error) {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToDelete) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    updateTags(updatedTags);
  };

  return (
    <div className={styles.TagInput}>
      <label htmlFor={name} className={styles["TagInput-label"]}>
        {label}
      </label>
      <input
        className={error && styles.error}
        placeholder={`${label}를 입력하세요`}
        value={inputValue}
        onBlur={onBlur}
        onChange={(e) => {
          setInputValue(e.target.value.trim());
          clearErrors(name);
        }}
        onFocus={() => {
          clearErrors(name);
        }}
        onKeyDown={handleKeyDown}
        name={name}
      />
      {error && <span className={styles["error-text"]}>{error.message}</span>}

      <ul className={styles.TagList}>
        {tags.map((tag, index) => {
          return (
            <li key={index}>
              <span>{`#${tag}`}</span>
              <button type="button" onClick={() => removeTag(tag)}>
                <Image
                  src={assets.icons.x}
                  alt="close icon"
                  width={22}
                  height={24}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
