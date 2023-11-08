import { makeAutoObservable, runInAction } from "mobx";
import type { MediaType, FormDataType } from "../typings/MediaStoreTypes";
import { FormStore } from "./MediaFormStore";
import { FilterStore } from "./MediaFilterStore";
import * as api from "../api/index";

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
  isLoading = false;
  isEditable: number | null = null;

  formDataStore;
  filterStore;

  constructor() {
    makeAutoObservable(this);
    this.formDataStore = FormStore;
    this.filterStore = FilterStore;
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

  setIsEditable = (id: number | null) => {
    this.isEditable = id;

    if (!id) {
      this.formDataStore.resetForm();
      return;
    }

    const selectedMedia = { ...this.media.find((item) => item.id === id) };
    this.formDataStore.setFormData(selectedMedia as FormDataType);
  };

  addMedia = async () => {
    try {
      this.isLoading = true;
      runInAction(async () => {
        const resp = await api.addMedia(this.formDataStore.formData);
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
        const resp = await api.updateMedia(id, this.formDataStore.formData);
        this.media = resp.data.media;
        this.formDataStore.resetForm();
        this.setIsEditable(null);

        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
    }
  };

  get filteredMediaData() {
    const { query, type } = this.filterStore.form;

    return this.media.filter((item) => {
      const byQuery = item.title
        ?.toLocaleLowerCase()
        ?.includes(query.toLocaleLowerCase());

      const byType = type ? item.type === type : true;

      return byQuery && byType;
    });
  }
}

const MediaStore = new MediaStoreClass();

export default MediaStore;
