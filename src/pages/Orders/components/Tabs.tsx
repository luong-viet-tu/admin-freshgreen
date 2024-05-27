import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { OrderStatus } from "../../../types/orderType";

interface TabProps {
  value: OrderStatus;
  setValue: (value: OrderStatus) => void;
}

export default function Tabs(props: TabProps) {
  const { value, setValue } = props;

  const handleChange = (event: React.SyntheticEvent, newValue: OrderStatus) => {
    setValue(newValue);
  };

  const TabData = [
    {
      label: "Chờ xác nhận",
      value: OrderStatus.pending,
    },
    {
      label: "Đã xác nhận",
      value: OrderStatus.access,
    },
    {
      label: "Hoàn tất",
      value: OrderStatus.done,
    },
    {
      label: "Đã hủy",
      value: OrderStatus.refuse,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <TabContext value={value}>
        <TabList onChange={handleChange}>
          {TabData.map((data) => (
            <Tab label={data.label} value={data.value} key={data.value} />
          ))}
        </TabList>
      </TabContext>
    </Box>
  );
}
