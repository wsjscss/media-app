import { useEffect } from "react";
import MediaStore from "../../store/MediaStore";
import { observer } from "mobx-react-lite";
import { MediaItem } from "../mediaItem/MediaItem";
import styles from "./media-list.module.css";

export const MediaList = observer(() => {
  const { getAllMedia, filteredMedia } = MediaStore;

  useEffect(() => {
    getAllMedia();
  }, []);

  return (
    <>
      <div className={styles.mediaList}>
        {filteredMedia.map(
          ({ id, rating, releaseYear, genre, title, imageSrc, type }) => (
            <MediaItem
              id={id}
              title={title}
              genre={genre}
              releaseYear={releaseYear}
              rating={rating}
              imageSrc={imageSrc}
              type={type}
              key={id}
            />
          )
        )}
      </div>
    </>
  );
});
