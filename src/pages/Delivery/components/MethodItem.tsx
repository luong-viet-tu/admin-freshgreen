import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { DeliveryType } from "../../../types/deliveryType";
import { deliveryActions } from "../../../actions/deliveryActions";
import { formattedAmount } from "../../../utils/handlers/formatMoney";
import { mainColor } from "../../../resources/color";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
export default function MethodItem(method: DeliveryType) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deliveryActions.delete(method._id!));
  };

  return (
    <Box mb={3}>
      <Box display={"flex"} alignItems={"center"} gap={2}>
        <Paper
          elevation={5}
          sx={{
            padding: 1,
            display: "flex",
            gap: 1,
            alignItems: "center",
            width: 350,
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography fontWeight={600} fontSize={18}>
              {method.method}
            </Typography>
            <Typography fontWeight={500} fontSize={15}>
              {method.time}
            </Typography>
          </Box>
          <Typography fontSize={22} color={mainColor}>
            {formattedAmount(method.amount)}
          </Typography>
          <IconButton onClick={handleDelete}>
            <HighlightOffIcon color={"error"} />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}
