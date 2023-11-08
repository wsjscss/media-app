import { observer } from "mobx-react-lite";
import type { MediaType } from "../../store/MediaStore";
import MediaStore from "../../store/MediaStore";
import styles from "./media-item.module.css";

export const MediaItem = observer(
  ({ id, rating, releaseYear, genre, title, imageSrc }: MediaType) => {
    const { deleteMedia, setIsEditable } = MediaStore;

    return (
      <div className={styles.mediaItemWrapper}>
        <div className={styles.mediaItem}>
          <img src={imageSrc} alt="" className={styles.mediaImg} />

          <div className={styles.mediaItemContent}>
            <h3 className={styles.mediaTitle}>{title}</h3>
            <p className={styles.mediaSmallText}>{genre}</p>
            <p className={styles.mediaSmallText}>Year: {releaseYear}</p>

            <div className={styles.mediaRating}>
              <div className={styles.mediaStar}>⭐</div>
              <div>{rating}</div>
            </div>

            <div className={styles.mediaItemCTA}>
              <button type="button" onClick={() => setIsEditable(id)}>
                Edit
              </button>

              <button
                type="button"
                className="danger"
                onClick={() => deleteMedia(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
