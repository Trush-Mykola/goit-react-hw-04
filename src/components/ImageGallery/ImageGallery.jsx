import css from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ photos, openModal }) => {
  return (
    <ul className={css.ul}>
      {Array.isArray(photos) &&
        photos.map((photo) => (
          <li key={photo.id}>
            <ImageCard openModal={openModal} photo={photo} />
          </li>
        ))}
    </ul>
  );
};

export default ImageGallery;
