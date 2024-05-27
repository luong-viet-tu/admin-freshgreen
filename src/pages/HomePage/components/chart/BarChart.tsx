import { Box } from "@mui/material";
import { Card, Title, BarChart } from "@tremor/react";
import ButtonExportToExcel from "../../../../components/ButtonExportToExcel";

interface BarProps {
  name: string;
  Price: number;
}

const dataFormatter = (number: number) => {
  return "vnd " + Intl.NumberFormat("vn").format(number).toString();
};

const Bar = ({ data }: { data: BarProps[] }) => (
  <Card className="max-width">
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Title>Tổng doanh thu theo sản phẩm</Title>

      <ButtonExportToExcel
        data={data}
        fileName="Tổng doanh thu theo sản phẩm"
      />
    </Box>
    <BarChart
      className="mt-6"
      data={data}
      index="name"
      categories={["Price"]}
      colors={["green"]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
    />
  </Card>
);

export default Bar;
