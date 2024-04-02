import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ photos, onImageClick }) => {
  return (
    <ul className={css.ul}>
      {Array.isArray(photos) &&
        photos.map((photo) => (
          <li key={photo.id} className={css.li}>
            <ImageCard onImageClick={onImageClick} photo={photo} />
          </li>
        ))}
    </ul>
  );
};

export default ImageGallery;
