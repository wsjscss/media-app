import axios from "axios";
import { FormDataType } from "../store/MediaStore";

axios.defaults.baseURL = "http://localhost:3000/api";

export const getAllMedia = () => {
  return axios.get("/media");
};

export const addMedia = (payload: FormDataType) => {
  return axios.post("/add", { ...payload });
};

export const deleteMedia = (id: number) => {
  return axios.delete("/delete", { params: { id } });
};

export const updateMedia = (id: number, payload: FormDataType) => {
  return axios.patch("/update", { id, data: payload });
};
