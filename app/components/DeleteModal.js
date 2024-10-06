import Modal from "react-modal";

export default function DeleteModal({ showModal, deleteModal, onClose }) {
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal
      className="simple-modal"
      isOpen={showModal}
      onRequestClose={handleCloseModal}
      contentLabel="sign-in-modal"
    >
      <p className="text-simple-modal">정말 삭제하시겠습니까?</p>
      <button className="btn-simple-modal" onClick={deleteModal} />
    </Modal>
  );
}
