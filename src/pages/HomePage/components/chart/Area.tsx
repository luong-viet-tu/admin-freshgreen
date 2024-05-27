import { Box } from "@mui/material";
import { Card, Title, AreaChart } from "@tremor/react";
import ButtonExportToExcel from "../../../../components/ButtonExportToExcel";

const dataFormatter = (number: number) => {
  return "vnd " + Intl.NumberFormat("vn").format(number).toString();
};

interface AreaProps {
  date: string;
  Access: number | false;
  Done: number | false;
  Refure: number | false;
}

interface SpendProps {
  name: string;
  value: number;
}

const Area = ({ data, spend }: { data: AreaProps[]; spend: SpendProps }) => {
  return (
    <Card>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Title>
          Thống kê {spend.name} {spend.value}
        </Title>
        <ButtonExportToExcel
          data={data}
          fileName={`Thống kê doanh thu ${spend.name} ${spend.value}`}
        />
      </Box>
      <AreaChart
        className="h-72 mt-4"
        data={data}
        index="date"
        categories={["Done", "Access", "Refure"]}
        colors={["green", "blue", "red"]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
};

export default Area;
