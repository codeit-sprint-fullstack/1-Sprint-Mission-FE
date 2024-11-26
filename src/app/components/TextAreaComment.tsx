"use client";

import classNames from "classnames";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { postCommentSchema, productCommentSchema } from "../constants/schema";

export interface TextAreaCommentProps {
  register: UseFormRegister<{ [key: string]: string }>;
  errors: FieldErrors<{ comment?: string }>;
  placeholder: string;
  isProduct: boolean;
}

export default function TextAreaComment({
  register,
  errors,
  placeholder,
  isProduct,
}: TextAreaCommentProps) {
  const textareaClass = classNames(
    "w-full",
    "h-full",
    "pt-[1.6rem]",
    "px-[2.4rem]",
    "bg-gray-100",
    "box-border",
    "text-[1.6rem]",
    "font-normal",
    "leading-[2.6rem]",
    "border",
    "border-[0.1rem]",
    "border-gray-100",
    "resize-none",
    "rounded-xl",
    "focus:border-input--focus",
    {
      "border-red": errors.comment,
    }
  );

  const maxCommentLength: number = isProduct
    ? productCommentSchema.MAX_LENGTH_PRODUCT_COMMENT_CONTENT
    : postCommentSchema.MAX_LENGTH_POST_COMMENT_CONTENT;
  const warningMessage: string = isProduct
    ? `${productCommentSchema.MAX_LENGTH_PRODUCT_COMMENT_CONTENT}자 이하 댓글이 필요합니다`
    : `${postCommentSchema.MAX_LENGTH_POST_COMMENT_CONTENT}자 이하 댓글이 필요합니다`;

  return (
    <>
      <textarea
        className={textareaClass}
        id="comment"
        placeholder={placeholder}
        {...register("comment", {
          required: "댓글을 입력해주세요",
          maxLength: {
            value: maxCommentLength,
            message: warningMessage,
          },
          setValueAs: (value) => value.trim(),
        })}
        aria-invalid={errors.comment ? "true" : "false"}
      />
      {errors.comment && (
        <p className="warning-text">{errors.comment.message}</p>
      )}
    </>
  );
}
