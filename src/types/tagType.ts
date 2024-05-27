export interface TagType {
  _id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export const initialTag: TagType = {
  _id: "",
  name: "",
  createdAt: "",
  updatedAt: "",
};
