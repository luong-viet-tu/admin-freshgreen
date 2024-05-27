import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { UserRole, UserType } from "../types/userType";
import { userActions } from "../actions/userActions";

interface SeletedUserProps {
  userSelected: string;
  setUserSelected: (userSelected: string) => void;
}

const SelectUser = (props: SeletedUserProps) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.user.users).filter(
    (user) => user.permissions?.name! !== UserRole.producer
  );

  useEffect(() => {
    dispatch(userActions.getUsers());
  }, [dispatch]);

  return !users.length ? (
    <CircularProgress />
  ) : (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Users</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.userSelected}
        label="Users"
        onChange={(e) => props.setUserSelected(e.target.value)}
      >
        {users.map((user: UserType) => (
          <MenuItem key={user._id} value={user._id}>
            {user.username}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectUser;
