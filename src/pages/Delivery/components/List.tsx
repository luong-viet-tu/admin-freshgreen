import { Paper } from "@mui/material";
import { DeliveryType } from "../../../types/deliveryType";
import MethodItem from "./MethodItem";

interface Props {
  methods: Array<DeliveryType>;
}

export default function List(props: Props) {
  const { methods } = props;

  return (
    <Paper elevation={8} sx={{ padding: 5, maxHeight: 500, overflowY: "auto" }}>
      {methods
        .map((method) => <MethodItem key={method._id} {...method} />)
        .reverse()}
    </Paper>
  );
}
