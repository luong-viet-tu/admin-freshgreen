import { UserDataType } from "./dataType";

export type LoginReqType = {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

export type StaffType = {
  fullname: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  email: string;
};

export type LoginResType = {
  token: string;
  user: StaffType;
};

export interface CustomAuthResponse {
  token: string;
  user: UserDataType;
}
