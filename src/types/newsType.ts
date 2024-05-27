import { TagType } from "./tagType";

interface AuthorType {
  _id: string;
  username: string;
}

export interface NewsType {
  _id?: string;
  title: string;
  category: string;
  thumbnail: string;
  tags: TagType[];
  author?: AuthorType;
  content: string;
  viewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type NewNewsType = Omit<NewsType, "author"> & {
  author: string;
};
