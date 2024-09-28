import { useFieldArray, useFormContext } from "react-hook-form";
import styles from "./InputFields.module.scss";
import assets from "@/variables/images";

export default function TagInput({ name, label, validations }) {
  const {
    register,
    formState: { errors },
    trigger,
    clearErrors,
    control,
  } = useFormContext();

  const { fields: tags, append, remove } = useFieldArray({ control, name });

  const addTag = (e) => {
    e.preventDefault();
    const newTag = e.target.elements.tags.value.trim();
    if (newTag !== "") {
      append({ value: newTag });
      e.target.reset();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e / nativeEvent.isComposing) {
      addTag();
    }

    return (
      <div className={styles.TagInput}>
        <label htmlFor={name}>{label}</label>
        <input
          type="text"
          placeholder={`${label}를 입력하세요`}
          {...register(name, {
            ...validations,
            onBlur: () => trigger(name),
            onChange: () => trigger(name),
          })}
          onFocus={() => {
            clearErrors(name);
            onkeydown = { handleKeyDown };
          }}
        />
        {errors && errors[name] && (
          <span className={styles["error-text"]}>{errors[name].message}</span>
        )}
        <ul className={styles.TagList}>
          {tags.map((tag, index) => {
            return (
              <li key={tag.id}>
                <span>{`#${tag}`}</span>
                <button type="button" onClick={() => remove(index)}>
                  <img src={assets.icons.x} alt="close icon" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
}
