export interface MessageType {
  sender: string;
  recipient: string;
  content: string;
  reply: boolean;
}

export interface SendType {
  from: string;
  to: string;
  message: {
    text?: string;
    image?: string;
    file?: string;
  };
}

export interface FromType {
  _id: string;
  avatar: string;
  fullname: string;
}

export interface MessageItemType {
  _id: string;
  users?: Array<string>;
  username: string;
  userId: string;
  lastMessage: {
    text?: string;
    image?: string;
    file?: string;
  };
  fullname: {
    firstname: string;
    lastname: string;
  };
  email: string;
  avatar: string;
  createdAt: string;
}
