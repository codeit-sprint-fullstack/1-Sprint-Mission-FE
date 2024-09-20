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
    trigger,
    clearErrors,
  } = useFormContext();

  const addError = errors[name] && styles.error;

  return (
    <div className={styles.Input}>
      {label && (
        <label className={styles["Input-label"]} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={addError}
        {...register(name, {
          ...validations,
          onBlur: () => trigger(name),
          onChange: () => trigger(name),
        })}
        onFocus={() => clearErrors(name)}
        placeholder={placeholder}
      />
      {errors && errors[name] && (
        <span className={styles["error-text"]}>{errors[name].message}</span>
      )}
    </div>
  );
}
