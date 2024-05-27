import { Card, Metric, Text } from "@tremor/react";
import { formattedAmount } from "../../../utils/handlers/formatMoney";

interface CartProps {
  title: string;
  value: number;
  color:
    | "green"
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | undefined;

  type?: string;
}

const CartItem = (props: CartProps) => (
  <Card
    className="w-60 mx-auto p-2"
    decoration="top"
    decorationColor={props.color}
  >
    <Text>{props.title}</Text>
    <Metric>
      {props.type === "number"
        ? formattedAmount(props.value)
        : `${props.value} đơn hàng`}
    </Metric>
  </Card>
);

export default CartItem;
