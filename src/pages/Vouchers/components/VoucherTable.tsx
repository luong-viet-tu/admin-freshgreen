import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingButton } from "@mui/lab";
import Search from "../../../components/common/Search";
import { VoucherType } from "../../../types/voucherType";

interface ActionButtonProps extends VoucherTableProps {
  voucher: VoucherType;
}

const ActionButton = (props: ActionButtonProps) => {
  const handleUpdate = () => {
    props.setVoucher(props.voucher);
    props.setHandle("Update");
  };

  return (
    <Box>
      <Button onClick={handleUpdate}>
        <EditIcon color="warning" />
      </Button>
      <LoadingButton
        loading={props.isPending}
        onClick={() => props.onDelete(props.voucher)}
      >
        <DeleteIcon color="error" />
      </LoadingButton>
    </Box>
  );
};

interface VoucherTableProps {
  vouchers?: VoucherType[];
  onDelete: (voucher: VoucherType) => void;
  setVoucher: (voucher: VoucherType) => void;
  isPending: boolean;
  handle: "Create" | "Update";
  setHandle: (handle: "Create" | "Update") => void;
}

export const VoucherTable = React.memo((props: VoucherTableProps) => {
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "voucher", headerName: "Voucher", width: 150 },
    { field: "discount", headerName: "Discount %", width: 150 },
    { field: "author", headerName: "Author", width: 220 },
    { field: "lastDate", headerName: "Last Date", width: 220 },
    { field: "createdAt", headerName: "Created Date", width: 200 },
    {
      field: "action",
      headerName: "Actions",
      width: 180,
      renderCell: (params: GridRenderCellParams) => (
        <ActionButton
          voucher={params.row}
          onDelete={props.onDelete}
          setVoucher={props.setVoucher}
          isPending={props.isPending}
          handle={props.handle}
          setHandle={props.setHandle}
        />
      ),
    },
  ];
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [dataReSearch, setDataReSearch] = React.useState<VoucherType[]>([]);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    startTransition(() => {
      const filteredVouchers = props?.vouchers?.filter((data) =>
        data.voucher?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      filteredVouchers && setDataReSearch(filteredVouchers);
    });
  }, [searchQuery, props.vouchers]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={5} width={"100%"}>
      <Typography align="center" fontWeight={600} fontSize={25}>
        Lists of Vouchers
      </Typography>
      <Box display={"flex"}>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="name"
        />
        {isPending && <CircularProgress size={20} />}
      </Box>
      <Box>
        <Typography fontWeight={600}>
          Có tổng cộng {dataReSearch.length} mã giảm giá
        </Typography>
        <DataGrid
          getRowId={(voucher) => voucher._id}
          sortModel={[{ field: "createdAt", sort: "desc" }]}
          rows={dataReSearch}
          columns={columns}
          rowSelection={false}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </Box>
  );
});
