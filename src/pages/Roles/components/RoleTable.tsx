import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import Search from "../../../components/common/Search";
import { RoleEnum, RoleType } from "../../../types/roleType";
import { useAppDispatch } from "../../../redux/hooks";
import { roleActions } from "../../../actions/roleActions";

interface ActionButtonProps {
  role: RoleType;
  onDelete: (role: RoleType) => void;
  isPending: boolean;
}
const ActionButton = (props: ActionButtonProps) => {
  return (
    <Box>
      <LoadingButton
        loading={props.isPending}
        onClick={() => props.onDelete(props.role)}
      >
        <DeleteIcon color="error" />
      </LoadingButton>
    </Box>
  );
};

interface RoleTableProps {
  roles: RoleType[];
  onDelete: (role: RoleType) => void;
  isPending: boolean;
}

const RenderRowPermissions = (data: GridRenderCellParams) => {
  const dispatch = useAppDispatch();

  const onChangeRole = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const roles: string[] = [...data.row.roles];
    await dispatch(
      roleActions.update({
        _id: data.row._id,
        roles: roles.includes(e.target.value)
          ? roles.filter((r) => r !== e.target.value)
          : [...roles, e.target.value],
      })
    );
  };
  return (
    <Box>
      {["view", "create", "update", "delete"].map(
        (permission: string, index: number) => {
          return (
            <FormControlLabel
              key={index}
              value={permission}
              control={
                <Switch
                  color="success"
                  defaultChecked={data.row.roles.includes(
                    permission as RoleEnum
                  )}
                  onChange={(e) => onChangeRole(e)}
                />
              }
              label={permission}
              labelPlacement="start"
            />
          );
        }
      )}
    </Box>
  );
};
export const RoleTable = (props: RoleTableProps) => {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 100 },
    {
      field: "permission",
      headerName: "Permission",
      align: "center",
      headerAlign: "center",
      width: 450,
      renderCell: (data: GridRenderCellParams) => RenderRowPermissions(data),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <ActionButton
          role={params.row}
          onDelete={props.onDelete}
          isPending={props.isPending}
        />
      ),
    },
  ];
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [dataReSearch, setDataReSearch] = React.useState<RoleType[]>([]);
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    startTransition(() => {
      if (props.roles.length) {
        const filteredRoles = props.roles?.filter((role) =>
          role.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setDataReSearch(filteredRoles);
      }
    });
  }, [searchQuery, props.roles]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={5}>
      <Typography align="center" fontWeight={600} fontSize={25}>
        Lists of Roles
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
          getRowId={(role: RoleType) => role._id!}
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
};
