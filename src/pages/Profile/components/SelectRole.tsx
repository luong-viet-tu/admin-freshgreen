import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { memo } from "react";

interface SelectRoleProps {
  role: string;
  isDisable: boolean;
  onUpdateRole: (permissions: string) => void;
}

const SelectRole = memo((props: SelectRoleProps) => {
  const roles = useAppSelector((state: RootState) => state.role.roles);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Quyền</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue={props.role}
        label="Quyền"
        disabled={!props.isDisable}
        onChange={(e) => {
          props.onUpdateRole(e.target.value);
        }}
      >
        {roles.map((data) => (
          <MenuItem key={data._id} value={data._id}>
            {data.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default SelectRole;
