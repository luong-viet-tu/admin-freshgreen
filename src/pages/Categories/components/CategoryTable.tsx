import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, CircularProgress, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import Search from "../../../components/common/Search";
import { CategoryType } from "../../../types/categoryType";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { allowDeleteCategory } from "../../../resources/permissions";
import { UserRole } from "../../../types/userType";

interface AactionButtonProps {
  category: CategoryType;
  onDelete: (category: CategoryType) => void;
  isPending: boolean;
}
const ActionButton = (props: AactionButtonProps) => {
  return (
    <Box>
      <LoadingButton
        loading={props.isPending}
        onClick={() => props.onDelete(props.category)}
      >
        <DeleteIcon color="error" />
      </LoadingButton>
    </Box>
  );
};

interface CategoryTableProps {
  categories: CategoryType[];
  onDelete: (category: CategoryType) => void;
  isPending: boolean;
}

export default function CategoryTable(props: CategoryTableProps) {
  const user = useAppSelector((state: RootState) => state.user.user);

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={params.row.image}
          style={{ width: 50, height: 50, objectFit: "cover" }}
          alt=""
        />
      ),
    },
    { field: "name", headerName: "Name", width: 100 },
    { field: "createdAt", headerName: "Created Date", width: 220 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params: GridRenderCellParams) =>
        allowDeleteCategory.includes(user.permissions?.name as UserRole) && (
          <ActionButton
            category={params.row}
            onDelete={props.onDelete}
            isPending={props.isPending}
          />
        ),
    },
  ];
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [dataReSearch, setDataReSearch] = React.useState<CategoryType[]>([]);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    startTransition(() => {
      const filteredCategories = props.categories.filter((category) =>
        category.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDataReSearch(filteredCategories);
    });
  }, [searchQuery, props.categories]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={5}>
      <Typography align="center" fontWeight={600} fontSize={25}>
        Lists of categories
      </Typography>
      <Box display={"flex"}>
        <Search
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="name"
        />
        {isPending && <CircularProgress size={20} color={"success"} />}
      </Box>
      <Box>
        <Typography fontWeight={600}>
          Có tổng cộng {dataReSearch.length} thể loại
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
