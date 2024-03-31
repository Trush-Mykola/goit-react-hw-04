import Modal from "react-modal";
import css from "./ImageCard.module.css";

const ImageCard = ({ photo, openModal }) => {
  return (
    <div onClick={() => openModal(photo)}>
      <img className={css.img} src={photo.urls.small} alt={photo.description} width={400} height={300} />
      <p>{photo.desk}</p>
    </div>
  );
};

export default ImageCard;
