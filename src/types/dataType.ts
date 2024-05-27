import moment from "moment";

interface FullnameType {
  firstname: string;
  lastname: string;
}

interface AddressType {
  city?: string;
  district?: string;
  ward?: string;
  street?: string;
  more?: string;
}

export type UserDataType = {
  _id: string;
  avatar?: string;
  email?: string;
  following?: [] | undefined;
  fullname?: FullnameType;
  phone?: string;
  role?: string;
  username?: string;
  address?: AddressType;
  createdAt: string;
};
