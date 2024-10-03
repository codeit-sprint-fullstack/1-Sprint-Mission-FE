import { useState } from "react";
import Image from "next/image";
import styles from "./InputFields.module.scss";
import assets from "@/variables/images";
import { useFormContext } from "react-hook-form";

const showPassWord = assets.buttons.eyeOn;
const hidePassWord = assets.buttons.eyeOff;

export function PasswordInput({
  name,
  label = "비밀번호",
  placeholder = "비밀번호를 입력해 주세요",
  validations = {},
}) {
  const {
    register,
    formState: { errors },
    trigger,
    clearErrors,
    watch,
  } = useFormContext();

  const [isVisible, setIsVisible] = useState(false);

  const addError = errors[name] && styles.error;
  const isConfirming = name === "passwordConfirmation";
  const password = watch("password");

  const handlePasswordVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.PasswordInput}>
      <label className={styles["PasswordInput-label"]} htmlFor={name}>
        {label}
      </label>
      <div className={styles.input}>
        <input
          className={addError}
          {...register(name, {
            ...validations,
            onBlur: () => trigger(name),
            onChange: () => trigger(name),
            validate: isConfirming
              ? (value) => value === password || "비밀번호가 일치하지 않습니다."
              : undefined,
          })}
          onFocus={() => clearErrors(name)}
          placeholder={placeholder}
          type={isVisible ? "text" : "password"}
        />

        <button
          onClick={handlePasswordVisibility}
          type="button"
          className={styles.toggleBtn}
        >
          <Image
            src={isVisible ? showPassWord : hidePassWord}
            alt={isVisible ? "비밀번호 보이기" : "비밀번호 숨기기"}
            width={24}
            height={24}
          />
        </button>
      </div>
      {errors && errors[name] && (
        <span className={styles["error-text"]}>{errors[name].message}</span>
      )}
    </div>
  );
}
