import Modal from "@/components/ui/Modal";
import { useModal } from "./useModal";

export default function useGlobalModal() {
  const {
    modalRef,
    onModalOpen,
    onModalClose,
    isModalOpen,
    modalMsg,
    onModalConfirm,
    nextAction,
  } = useModal();

  const GlobalModal = () => {
    const handleClose = (nextAction && onModalConfirm) || onModalClose;
    return (
      isModalOpen && (
        <Modal ref={modalRef} msg={modalMsg} onClose={handleClose} />
      )
    );
  };

  return {
    onModalOpen,
    GlobalModal,
    onModalConfirm,
  };
}
