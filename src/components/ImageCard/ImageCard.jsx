import Modal from "react-modal";
import css from "./ImageCard.module.css";

const ImageCard = ({ photo, onImageClick }) => {
  return (
    <div className={css.imageCard}>
      <img className={css.img} src={photo.urls.small} alt={photo.alt_description} onClick={() => onImageClick(photo)} />
    </div>
  );
};

export default ImageCard;
