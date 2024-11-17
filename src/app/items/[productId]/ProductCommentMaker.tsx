"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import classNames from "classnames";

import TextAreaComment from "src/app/components/TextareaComment";

interface ProductCommentMakerProps {
  addComment: (content: string) => void;
}

export default function ProductCommentMaker({
  addComment,
}: ProductCommentMakerProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const commentMakerClass = classNames(
    "w-pc-content",
    "ta:w-ta-content",
    "mo:w-mo-content"
  );
  const commentTextAreaFrameClass = classNames(
    "w-full",
    "h-[10.4rem]",
    "mt-[0.9rem]"
  );
  const commentMakerLabelClass = classNames(
    "font-semibold",
    "text-lg",
    "leading-26"
  );
  const commentBottomBarClass = classNames(
    "flex",
    "flex-row",
    "justify-end",
    "w-full",
    "h-[4.2rem]",
    "mt-[1.6rem]"
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRegistBtnClick = async () => {
    try {
      addComment(watch("comment"));
      reset();
    } catch (err) {
      let errorMessage = "에러가 발생하였습니다";

      if (axios.isAxiosError(err) && err.response?.data) {
        errorMessage =
          err.response.data.message || "에러가 발생하였습니다(AxiosError)";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setModalMessage(errorMessage);
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
  }, []);

  return (
    <div className={commentMakerClass}>
      <div className={commentMakerLabelClass}>문의하기</div>
      <form onSubmit={handleSubmit(handleRegistBtnClick)}>
        <div className={commentTextAreaFrameClass}>
          <TextAreaComment
            register={register}
            errors={errors}
            placeholder={
              "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            }
            isProduct={true}
          />
        </div>
        <div className={commentBottomBarClass}>
          <button
            className="btn-comment-regist"
            type="submit"
            disabled={!isValid}
          />
        </div>
        <Modal
          className="simple-modal"
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          contentLabel="product-comment-modal"
        >
          <p className="text-simple-modal">{modalMessage}</p>
          <button className="btn-simple-modal" onClick={handleCloseModal} />
        </Modal>
      </form>
    </div>
  );
}
