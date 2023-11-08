import { observer } from "mobx-react-lite";
import MediaStore from "../../store/MediaStore";
import styles from "./filter-bar.module.css";
import { ChangeEvent } from "react";
import { FilterFormTypeKeys } from "../../typings/MediaStoreTypes";
import { FilterStore } from "../../store/MediaFilterStore";

export const FilterBar = observer(() => {
  const { mediaTypeList } = MediaStore;
  const { form, setFilterForm, resetFilters } = FilterStore;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFilterForm(name as FilterFormTypeKeys, value);
  };

  return (
    <div className={styles.filters}>
      <h3>Filters</h3>

      <input
        type="text"
        placeholder="Search by title"
        value={form.query}
        name="query"
        onInput={(event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event)
        }
      />

      <select
        name="type"
        value={form.type}
        onInput={(event: ChangeEvent<HTMLSelectElement>) =>
          handleInputChange(event)
        }
      >
        <option value="" disabled>
          Select one
        </option>
        {mediaTypeList.map((item) => (
          <option value={item.type} key={item.type}>
            {item.label}
          </option>
        ))}
      </select>

      <button className="outline" onClick={resetFilters}>
        Reset filters
      </button>
    </div>
  );
});
