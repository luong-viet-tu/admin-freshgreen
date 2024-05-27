import * as React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { userActions } from "../../actions/userActions";
import Search from "../../components/common/Search";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { ActionButton } from "./components/ActionButton";
import moment from "moment";
import { UserRole, UserType } from "../../types/userType";
import { exportExcel } from "../../utils/handlers/exportExcel";
import ButtonExportToExcel from "../../components/ButtonExportToExcel";

export default function Users() {
  const user = useAppSelector((state) => state.user.user);
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone", width: 180 },
    { field: "createdAt", headerName: "Join Time", width: 250 },
    { field: "role", headerName: "Role", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        if (
          user.permissions?.name === UserRole.superadmin ||
          (params.row.permissions?.name !== UserRole.admin &&
            params.row.permissions?.name !== UserRole.superadmin)
        ) {
          return (
            <ActionButton
              isDeleteLoading={isDeleteLoading}
              setIsDeleteLoading={setIsDeleteLoading}
              rowData={params.row}
            />
          );
        }
      },
    },
  ];
  const dispatch = useAppDispatch();
  const [users, setUsers] = React.useState<UserType[]>([]);
  const [usersCreatedAccToDay, setUsersCreatedAccToDay] = React.useState<
    UserType[]
  >([]);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [dataReSearch, setDataReSearch] = React.useState<UserType[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const isLoading = useAppSelector((state: RootState) => state.user.isLoading);

  // get users from database
  React.useEffect(() => {
    const getUsers = async () => {
      const result = await dispatch(userActions.getUsers()).unwrap();

      const customUser = result.map((user: UserType) => ({
        ...user,
        firstname: user.fullname?.firstname,
        lastname: user.fullname?.lastname,
        role: user.permissions?.name,
        phone: user.phone.includes("social") ? "" : user.phone,
        createdAt: moment(user.createdAt).format("lll"),
      }));

      const today = moment().startOf("day");

      // filter users created acction today
      const usersCreatedToday = customUser.filter((user: UserType) => {
        const createdAt = moment(user.createdAt);
        return createdAt.isSame(today, "day");
      });

      setUsers(customUser);
      setUsersCreatedAccToDay(usersCreatedToday);
    };
    getUsers();
  }, [isDeleteLoading, dispatch]);

  const adminList = React.useMemo(() => {
    return users.filter(
      (user) =>
        user.permissions?.name! === UserRole.admin ||
        user.permissions?.name! === UserRole.superadmin
    );
  }, [users]);

  // search result
  React.useEffect(() => {
    startTransition(() => {
      setDataReSearch(
        users.filter((user) => {
          const { email, username, phone } = user;

          if (
            typeof email === "string" &&
            email.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return true;
          }

          if (
            typeof username === "string" &&
            username.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return true;
          }
          if (
            typeof phone === "string" &&
            phone.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return true;
          }

          return false;
        })
      );
    });
  }, [users, searchQuery]);

  return (
    <Box>
      {isLoading && <LinearProgress />}
      <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={5}>
        <Box display={"flex"}>
          <Search
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="name, username or phone or email"
          />
          {isPending && <CircularProgress size={20} />}
        </Box>
        <Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography fontWeight={600}>
              Có tổng cộng {dataReSearch.length} người dùng
            </Typography>
            <ButtonExportToExcel
              data={dataReSearch}
              fileName="Danh sách người dùng"
            />
          </Box>

          <DataGrid
            getRowId={(user) => user._id}
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
        <Box>
          <Typography fontWeight={600}>
            Có {adminList.length} Quản trị viên
          </Typography>
          <DataGrid
            sortModel={[{ field: "createdAt", sort: "desc" }]}
            getRowId={(user) => user._id}
            rows={adminList}
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
        <Box>
          <Typography fontWeight={600}>
            Có {usersCreatedAccToDay.length} người dùng mới hôm nay
          </Typography>
          <DataGrid
            sortModel={[{ field: "createdAt", sort: "desc" }]}
            getRowId={(user) => user._id}
            rows={usersCreatedAccToDay}
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
    </Box>
  );
}
