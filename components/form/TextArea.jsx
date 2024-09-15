import { useFormContext } from "react-hook-form";
import styles from "./InputFields.module.scss";

export default function TextArea({
  name,
  label = false,
  placeholder = "내용을 입력해 주세요",
  validations,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return label ? (
    <div className={styles.TextArea}>
      <label htmlFor={name} className={styles["TextArea-label"]}>
        {label}
      </label>
      <textarea {...register(name, validations)} placeholder={placeholder} />
      {errors && errors[name] && <span>{errors[name].message}</span>}
    </div>
  ) : (
    <div className={styles.TextArea}>
      <textarea {...register(name, validations)} placeholder={placeholder} />
      {errors && errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
}
