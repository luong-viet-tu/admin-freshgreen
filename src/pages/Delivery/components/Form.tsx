import { LoadingButton } from "@mui/lab";
import { Box, Paper, Typography, TextField } from "@mui/material";
import { FormEvent, memo } from "react";
import { DeliveryType } from "../../../types/deliveryType";

interface Props {
  onSubmit: (data: DeliveryType) => void;
  isLoading: boolean;
}

export const Form = memo((props: Props) => {
  const { onSubmit, isLoading } = props;
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: DeliveryType = {
      method: formData.get("method")?.toString()!,
      amount: +formData.get("amount")!,
      time: formData.get("time")?.toString()!,
    };
    onSubmit(data);
  };

  return (
    <Paper elevation={5} sx={{ padding: 3, width: 300 }}>
      <Typography fontSize={22} fontWeight={600} textAlign={"center"}>
        Create delivery method
      </Typography>
      <Box
        onSubmit={handleSubmit}
        component={"form"}
        sx={{ display: "flex", flexDirection: "column", gap: 3, py: 5 }}
      >
        <TextField
          label="Method"
          name="method"
          placeholder="Enter a method"
          required
        />
        <TextField label="Time" name="time" placeholder="Enter time" required />
        <TextField
          required
          name="amount"
          placeholder="Enter amount"
          label={"amount"}
        />

        <LoadingButton
          color="success"
          variant="contained"
          type="submit"
          loading={isLoading}
          sx={{ fontWeight: 600, color: "white" }}
        >
          Create
        </LoadingButton>
      </Box>
    </Paper>
  );
});
