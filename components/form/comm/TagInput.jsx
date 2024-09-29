import { useFormContext } from "react-hook-form";
import styles from "./InputFields.module.scss";
import assets from "@/variables/images";
import { useState } from "react";

export default function TagInput({ name, label, validations }) {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const {
    register,
    formState: { errors },
    trigger,
    clearErrors,
  } = useFormContext();

  const addTag = () => {
    const newTag = inputValue;
    if (newTag !== "") {
      if (!tags.includes(newTag)) {
        setTags((prevTags) => [...prevTags, newTag]);
        setInputValue("");
      } else {
        console.log("이미 입력한 태그임");
      }
    }
    console.log(newTag);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing && !errors[name]) {
      e.preventDefault();
      addTag();
    }
  };

  const handleClick = (tagToDelete) => {
    deleteTag(tagToDelete);
  };

  const deleteTag = (tagToDelete) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag !== tagToDelete);
    });
  };

  const addError = errors[name] && styles.error;
  return (
    <div className={styles.TagInput}>
      <label htmlFor={name} className={styles["TagInput-label"]}>
        {label}
      </label>
      <input
        value={inputValue}
        className={addError}
        placeholder={`${label}를 입력하세요`}
        {...register(name, {
          ...validations,
          onBlur: () => trigger(name),
          onChange: (e) => {
            setInputValue(e.target.value.trim());
            trigger(name);
          },
        })}
        onFocus={() => {
          clearErrors(name);
        }}
        onKeyDown={handleKeyDown}
      />
      {errors && errors[name] && (
        <span className={styles["error-text"]}>{errors[name].message}</span>
      )}
      <ul className={styles.TagList}>
        {tags.map((tag, index) => {
          return (
            <li key={index}>
              <span>{`#${tag}`}</span>
              <button type="button" onClick={() => handleClick(tag)}>
                <img src={assets.icons.x} alt="close icon" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
