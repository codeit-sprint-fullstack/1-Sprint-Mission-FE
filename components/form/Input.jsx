import { useFormContext } from "react-hook-form";
import styles from "./InputFields.module.scss";

export default function Input({
  name,
  label = false,
  placeholder = "입력해 주세요",
  validations = {},
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return label ? (
    <div className={styles.Input}>
      <label className={styles["Input-label"]} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles["Input-input"]}
        {...register(name, validations)}
        placeholder={placeholder}
      />
      {errors && errors[name] && <span>{errors[name].message}</span>}
    </div>
  ) : (
    <div className={styles.Input}>
      <input
        className={styles["Input-input"]}
        {...register(name, validations)}
        placeholder={placeholder}
      />
      {errors && errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
}
