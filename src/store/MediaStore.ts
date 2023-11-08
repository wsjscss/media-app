import { autorun, makeAutoObservable, runInAction } from "mobx";
import * as api from "../api/index";

export type MediaType = {
  id: number;
  title?: string;
  type?: string;
  genre?: string;
  releaseYear?: number;
  rating?: number;
  imageSrc?: string;
};

export interface FormDataType {
  title: string;
  genre: string;
  type: string;
  releaseYear: number;
  rating: number;
}

export interface FilterFormType {
  query: string;
  type: string;
}

const getInitialFormData = () => ({
  title: "",
  genre: "",
  type: "movie",
  releaseYear: 2000,
  rating: 10,
});

const getInitialFilterData = () => ({
  query: "",
  type: "",
});

export class MediaStoreClass {
  media: MediaType[] = [];
  mediaTypeList = [
    {
      type: "movie",
      label: "Movie",
    },
    { type: "game", label: "Game" },
    { type: "tv-show", label: "TV-Show" },
  ];
  formData = getInitialFormData();
  selectedItemId = null;
  isLoading = false;
  isEditable: number | null = null;
  filtersForm = getInitialFilterData();
  filteredMedia: MediaType[] = this.media;

  constructor() {
    makeAutoObservable(this);
  }

  getAllMedia = async () => {
    try {
      this.isLoading = true;
      runInAction(async () => {
        const resp = await api.getAllMedia();
        this.media = resp.data.media;

        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  setFormData = <K extends keyof FormDataType>(
    fieldName: K,
    value: FormDataType[K]
  ) => {
    this.formData[fieldName] = value;
  };

  resetForm = () => {
    this.formData = getInitialFormData();
  };

  setIsEditable = (id: number | null) => {
    this.isEditable = id;

    if (!id) {
      this.resetForm();
      return;
    }

    const selectedMedia = this.media.find((item) => item.id === id);
    const { title, genre, type, releaseYear, rating } =
      selectedMedia as FormDataType;
    this.formData = { title, genre, type, releaseYear, rating };
  };

  addMedia = async () => {
    try {
      this.isLoading = true;
      runInAction(async () => {
        const resp = await api.addMedia(this.formData);
        this.media = resp.data.media;

        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  deleteMedia = async (id: number) => {
    if (!id) return;

    try {
      this.isLoading = true;
      runInAction(async () => {
        const resp = await api.deleteMedia(id);
        this.media = resp.data.media;

        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  updateMedia = async () => {
    if (!this.isEditable) return;

    const id = this.isEditable;

    try {
      this.isLoading = true;
      runInAction(async () => {
        const resp = await api.updateMedia(id, this.formData);
        this.media = resp.data.media;
        this.resetForm();
        this.setIsEditable(null);

        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  setFilterForm = <K extends keyof FilterFormType>(
    fieldName: K,
    value: FilterFormType[K]
  ) => {
    this.filtersForm[fieldName] = value;
  };

  resetFilters = () => {
    this.filtersForm = getInitialFilterData();
  };
}

const MediaStore = new MediaStoreClass();

autorun(() => {
  console.log("Auto", MediaStore.filtersForm.query);
  if (
    MediaStore.filtersForm.query === "" &&
    MediaStore.filtersForm.type === ""
  ) {
    MediaStore.filteredMedia = MediaStore.media;
  }

  const { query, type } = MediaStore.filtersForm;

  MediaStore.filteredMedia = MediaStore.media.filter((item) => {
    const byQuery = item.title
      ?.toLocaleLowerCase()
      ?.includes(query.toLocaleLowerCase());

    const byType = type ? item.type === type : true;

    return byQuery && byType;
  });
});

export default MediaStore;
