import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useId } from "react";

export interface AddressProps {
  city: string;
  district: string;
  ward: string;
  street: string;
  more: string;
  [key: string]: string;
}

interface SelectionFormProps {
  name: string;
  data: { name: string }[];
  address: AddressProps;
  setAddress: (address: AddressProps) => void;
  handleChange: (name: string, value: string) => void;
  disabled: boolean;
}

export const AddressForm = React.memo((props: SelectionFormProps) => {
  const id = useId();

  return (
    <FormControl sx={{ width: "45%" }}>
      <InputLabel id={id}>{props.name}</InputLabel>
      <Select
        labelId={id}
        id={id}
        defaultValue={props?.address[props?.name?.toLowerCase()] || ""}
        label={props.name}
        disabled={props.disabled}
        onChange={(e) =>
          props.handleChange(props.name.toLowerCase(), e.target.value)
        }
      >
        { props.data?.length && props.data.map((province: any, index) => (
          <MenuItem key={index} value={province.name}>
            {province.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
