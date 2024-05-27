import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { settingsActions } from "../../../actions/settingActions";
import { NotificationToast } from "../../../utils/handlers/NotificationToast";

const TokenForm = ({ tokenGPT }: { tokenGPT: string }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const data: { tokenGPT: string } = {
      tokenGPT: formData.get("token") as string,
    };
    await dispatch(settingsActions.tokenGPT(data.tokenGPT))
      .unwrap()
      .then(() =>
        NotificationToast({
          message: "Token created successfully",
          type: "success",
        })
      )
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Box
      onSubmit={handleSubmit}
      component={"form"}
      sx={{ display: "flex", flexDirection: "column", m: 5, gap: 2 }}
    >
      <Typography textAlign={"center"} fontSize={23} fontWeight={600}>
        Token GPT
      </Typography>
      <TextField name="token" label="TokenGPT" defaultValue={tokenGPT} />

      <LoadingButton
        loading={loading}
        type="submit"
        fullWidth
        variant="contained"
      >
        Submit
      </LoadingButton>
    </Box>
  );
};

export default TokenForm;
