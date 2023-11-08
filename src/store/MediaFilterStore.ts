import { makeAutoObservable } from "mobx";
import { FilterFormType, FilterFormTypeKeys } from "../typings/MediaStoreTypes";

const getInitialFilterData = () => ({
  query: "",
  type: "",
});

class FilterStoreClass {
  form = getInitialFilterData();

  constructor() {
    makeAutoObservable(this);
  }

  setFilterForm = <K extends FilterFormTypeKeys>(
    fieldName: K,
    value: FilterFormType[K]
  ) => {
    this.form[fieldName] = value;
  };

  resetFilters = () => {
    this.form = getInitialFilterData();
  };
}

export const FilterStore = new FilterStoreClass();
