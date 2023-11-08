import { makeAutoObservable } from "mobx";
import type {
  FormDataTypeKeys,
  FormDataType,
} from "../typings/MediaStoreTypes";

const getInitialFormData = () => ({
  title: "",
  genre: "",
  type: "movie",
  releaseYear: 2000,
  rating: 10,
});

export class FormStoreClass {
  formData = getInitialFormData();

  constructor() {
    makeAutoObservable(this);
  }

  setFormDataField = <K extends FormDataTypeKeys>(
    fieldName: K,
    value: FormDataType[K]
  ) => {
    this.formData[fieldName] = value;
  };

  setFormData = (data: FormDataType) => {
    this.formData = data;
  };

  resetForm = () => {
    this.formData = getInitialFormData();
  };
}

export const FormStore = new FormStoreClass();
