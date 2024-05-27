import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
} from "@tremor/react";
import { formattedAmount } from "../../../utils/handlers/formatMoney";
import { Avatar, Box } from "@mui/material";
import ButtonExportToExcel from "../../../components/ButtonExportToExcel";

export interface OrderTableProps {
  id: string;
  avatar: string;
  fullname: string;
  phone: string;
  username: string;
  address: string;
  sold: number;
  price: number;
}

const TopUserTable = ({ data }: { data: OrderTableProps[] }) => (
  <Card>
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Title>Top người dùng</Title>
      <ButtonExportToExcel data={data} fileName="Top người dùng" />
    </Box>
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>STT</TableHeaderCell>
          <TableHeaderCell>Avatar</TableHeaderCell>
          <TableHeaderCell>Tên</TableHeaderCell>
          <TableHeaderCell>Sdt</TableHeaderCell>
          <TableHeaderCell>Tên người dùng</TableHeaderCell>
          <TableHeaderCell>Địa chỉ</TableHeaderCell>
          <TableHeaderCell>Đã mua</TableHeaderCell>
          <TableHeaderCell>Đã chi</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody className="max-h-60 overflow-y-auto">
        {data.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Avatar
                src={item.avatar}
                alt={item.fullname}
                sx={{ width: 50, height: 50, objectFit: "cover" }}
              />
            </TableCell>
            <TableCell>{item.fullname}</TableCell>
            <TableCell>
              <Text>{item.phone}</Text>
            </TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>{item.sold}</TableCell>
            <TableCell>{formattedAmount(item.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
);

export default TopUserTable;
