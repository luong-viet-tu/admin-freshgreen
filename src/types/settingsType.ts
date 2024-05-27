import { EmailPortType } from "../utils/api/settingApi";

export interface SettingsType {
  _id?: string;
  banners: {
    images: Array<string>;
  };
  emailSendPort: EmailPortType;
  tokenGPT: string;
  createdAt?: string;
  updatedAt?: string;
}
