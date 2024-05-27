import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import Search from "../../../components/common/Search";
import { UnitActionsType } from "../../../actions/unitActions";

interface ActionButtonProps {
  unit: UnitActionsType;
  onDelete: (category: UnitActionsType) => void;
  isPending: boolean;
}
const ActionButton = (props: ActionButtonProps) => {
  return (
    <Box>
      <LoadingButton
        loading={props.isPending}
        onClick={() => props.onDelete(props.unit)}
      >
        <DeleteIcon color="error" />
      </LoadingButton>
    </Box>
  );
};

interface TagTableProps {
  tags: UnitActionsType[];
  onDelete: (category: UnitActionsType) => void;
  isPending: boolean;
}

export default function UnitTable(props: TagTableProps) {
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "createdAt", headerName: "Created Date", width: 220 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <ActionButton
          unit={params.row}
          onDelete={props.onDelete}
          isPending={props.isPending}
        />
      ),
    },
  ];
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [dataReSearch, setDataReSearch] = React.useState<UnitActionsType[]>([]);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    startTransition(() => {
      const filteredTags = props.tags.filter((tag) =>
        tag.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDataReSearch(filteredTags);
    });
  }, [searchQuery, props.tags]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={5}>
      <Typography align="center" fontWeight={600} fontSize={25}>
        Lists of Units
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
          Có tổng cộng {dataReSearch.length} thẻ
        </Typography>
        <DataGrid
          getRowId={(category) => category._id}
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
}
