import { observer } from "mobx-react-lite";
import MediaStore from "../../store/MediaStore";
import styles from "./filter-bar.module.css";
import { ChangeEvent } from "react";

export const FilterBar = observer(() => {
  const { mediaTypeList, filtersForm, setFilterForm, resetFilters } =
    MediaStore;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFilterForm(name, value);
  };

  return (
    <div className={styles.filters}>
      <h3>Filters</h3>

      <input
        type="text"
        placeholder="Search by title"
        value={filtersForm.query}
        name="query"
        onInput={(event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event)
        }
      />

      <select
        name="type"
        value={filtersForm.type}
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
