import css from "./ImageModal.module.css";
import Modal from "react-modal";

const ImageModal = ({ photo, isOpen, onRequestClose }) => {
  return (
    <Modal contentClassName={css.modal} appElement={document.getElementById("root")} isOpen={isOpen} onRequestClose={onRequestClose}>
      {photo && (
        <div className={css.cont}>
          <img className={css.img} src={photo.urls.regular} alt={photo.alt_description} />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
