import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, memo } from "react";
import { VoucherErrType } from "..";
import { formatDateInput } from "../../../utils/handlers/formatDateInput";
import { VoucherType } from "../../../types/voucherType";

interface VoucherProps {
  voucher: VoucherType;
  setVoucher: (voucher: VoucherType) => void;
  onChange: () => void;
  voucherErrText: VoucherErrType;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  handle: "Create" | "Update";
  handleCancel: () => void;
}

const VoucherForm = memo((props: VoucherProps) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={5}>
      <Typography align="center" fontWeight={600} fontSize={25}>
        {props.handle} a Voucher
      </Typography>
      <Box>
        <TextField
          fullWidth
          name="voucher"
          label="Voucher"
          type="text"
          margin="normal"
          value={props.voucher.voucher}
          error={props.voucherErrText.voucher !== ""}
          helperText={props.voucherErrText.voucher}
          onChange={props.handleInputChange}
        />
        <TextField
          fullWidth
          name="discount"
          label="Discount %"
          type="number"
          value={props.voucher.discount}
          error={props.voucherErrText.discount !== ""}
          helperText={props.voucherErrText.discount}
          margin="normal"
          onChange={props.handleInputChange}
        />
        <TextField
          fullWidth
          name="lastDate"
          label="Last Date"
          type="date"
          value={formatDateInput(props.voucher.lastDate)}
          error={props.voucherErrText.lastDate !== ""}
          helperText={props.voucherErrText.lastDate}
          margin="normal"
          onChange={props.handleInputChange}
        />
        <LoadingButton
          variant="contained"
          onClick={props.onChange}
          fullWidth
          loading={props.isLoading}
          sx={{ mt: 3 }}
        >
          {props.handle}
        </LoadingButton>
        <Button
          variant="outlined"
          onClick={props.handleCancel}
          color="warning"
          fullWidth
          sx={{ mt: 3 }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
});

export default VoucherForm;
