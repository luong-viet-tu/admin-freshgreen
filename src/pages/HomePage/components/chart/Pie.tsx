import { Card, Title, DonutChart } from "@tremor/react";
import ButtonExportToExcel from "../../../../components/ButtonExportToExcel";
import { Box } from "@mui/material";

interface PieProps {
  name: string;
  count: number;
}

const valueFormatter = (number: number) => `Số lượng ${number.toString()}`;

const PieChart = ({ data }: { data: PieProps[] }) => (
  <Card className="max-w-lg">
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Title>Tổng số lượng sản phẩm đã bán</Title>

      <ButtonExportToExcel
        data={data}
        fileName="Tổng số lượng sản phẩm đã bán"
      />
    </Box>
    <DonutChart
      className="mt-6"
      data={data}
      category="count"
      index="name"
      valueFormatter={valueFormatter}
      colors={[
        "slate",
        "violet",
        "indigo",
        "rose",
        "cyan",
        "amber",
        "emerald",
        "lime",
      ]}
    />
  </Card>
);

export default PieChart;
