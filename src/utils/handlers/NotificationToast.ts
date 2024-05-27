import { TypeOptions, toast } from "react-toastify";

interface Props {
  message: string;
  type: TypeOptions | undefined;
}

export const NotificationToast = (props: Props) => {
  toast(props.message, {
    type: props.type,
    position: toast.POSITION.TOP_RIGHT,
  });
};
