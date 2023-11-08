import { FormDataType } from "../typings/MediaStoreTypes";
import client from "./axiosClient";

export const getAllMedia = () => {
  return client.get("/media");
};

export const addMedia = (payload: FormDataType) => {
  return client.post("/add", { ...payload });
};

export const deleteMedia = (id: number) => {
  return client.delete("/delete", { params: { id } });
};

export const updateMedia = (id: number, payload: FormDataType) => {
  return client.patch("/update", { id, data: payload });
};
