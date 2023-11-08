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

export type FormDataTypeKeys = keyof FormDataType;

export interface FilterFormType {
  query: string;
  type: string;
}

export type FilterFormTypeKeys = keyof FilterFormType;
