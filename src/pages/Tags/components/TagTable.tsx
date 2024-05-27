import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import Search from "../../../components/common/Search";
import { TagActionsType } from "../../../actions/tagActions";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { allowDeleteTag } from "../../../resources/permissions";
import { UserRole } from "../../../types/userType";

interface ActionButtonProps {
  tag: TagActionsType;
  onDelete: (category: TagActionsType) => void;
  isPending: boolean;
}
const ActionButton = (props: ActionButtonProps) => {
  return (
    <Box>
      <LoadingButton
        loading={props.isPending}
        onClick={() => props.onDelete(props.tag)}
      >
        <DeleteIcon color="error" />
      </LoadingButton>
    </Box>
  );
};

interface TagTableProps {
  tags: TagActionsType[];
  onDelete: (category: TagActionsType) => void;
  isPending: boolean;
}

export default function CategoryTable(props: TagTableProps) {
  const user = useAppSelector((state: RootState) => state.user.user);
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "createdAt", headerName: "Created Date", width: 220 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: GridRenderCellParams) =>
        allowDeleteTag.includes(user.permissions?.name as UserRole) && (
          <ActionButton
            tag={params.row}
            onDelete={props.onDelete}
            isPending={props.isPending}
          />
        ),
    },
  ];
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [dataReSearch, setDataReSearch] = React.useState<TagActionsType[]>([]);
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
        Lists of Tags
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
