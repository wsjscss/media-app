import { observer } from "mobx-react-lite";
import MediaStore from "../../store/MediaStore";
import { FormStore } from "../../store/MediaFormStore";
import styles from "./media-form.module.css";
import { ChangeEvent } from "react";
import { FormDataTypeKeys } from "../../typings/MediaStoreTypes";

export const MediaForm = observer(() => {
  const { isEditable, setIsEditable, mediaTypeList, addMedia, updateMedia } =
    MediaStore;

  const { formData, setFormDataField, resetForm } = FormStore;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addMedia();
    resetForm();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormDataField(name as FormDataTypeKeys, value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.mediaForm}>
        <input
          type="text"
          name="title"
          required
          placeholder="Title"
          value={formData.title}
          onInput={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event)
          }
        />

        <input
          type="text"
          placeholder="Genre"
          required
          name="genre"
          value={formData.genre}
          onInput={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event)
          }
        />

        <input
          type="number"
          placeholder="Rating"
          min={1}
          max={10}
          step={0.1}
          name="rating"
          value={formData.rating}
          onInput={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event)
          }
        />

        <input
          type="number"
          placeholder="Year"
          min={1900}
          max={2023}
          name="releaseYear"
          value={formData.releaseYear}
          onInput={(event: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(event)
          }
        />

        <select
          name="type"
          value={formData.type}
          onInput={(event: ChangeEvent<HTMLSelectElement>) =>
            handleInputChange(event)
          }
        >
          {mediaTypeList.map((item) => (
            <option value={item.type} key={item.type}>
              {item.label}
            </option>
          ))}
        </select>

        {isEditable ? (
          <>
            <button type="button" onClick={() => updateMedia()}>
              Update
            </button>
            <button
              type="button"
              className="outline"
              onClick={() => setIsEditable(null)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button type="submit">Create</button>
        )}
      </form>
    </>
  );
});
