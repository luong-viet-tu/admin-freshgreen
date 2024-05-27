import { useEffect, useState } from "react";
import TagForm from "./components/UnitForm";
import TagTable from "./components/UnitTable";
import { Box, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { UnitActionsType, unitActions } from "../../actions/unitActions";

const Unit = () => {
  const [unit, setUnit] = useState<string>("");
  const [tagErrText, settagErrText] = useState<string>("");
  const [isPending, setIsPending] = useState(false);

  const loading = useAppSelector((state: RootState) => state.tag.isLoading);
  const units = useAppSelector((state: RootState) => state.unit.units);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(unitActions.gets());
  }, [dispatch]);

  const handleChange = async () => {
    if (unit === "") {
      settagErrText("Bạn chưa nhập đơn vị");
      return;
    }
    dispatch(unitActions.create({ name: unit }));
    setUnit("");
  };

  const handleDelete = async (tag: UnitActionsType) => {
    setIsPending(true);
    dispatch(unitActions.delete(tag));
    setIsPending(false);
  };
  return (
    <Box display={"flex"} gap={10} justifyContent={"center"}>
      <TagForm
        unit={unit}
        setUnit={setUnit}
        onChange={handleChange}
        tagErrText={tagErrText}
        isLoading={loading}
      />
      {loading ? (
        <Box display={"flex"} justifyContent={"center"} width={"50%"}>
          <CircularProgress />
        </Box>
      ) : (
        <Box width={"50%"}>
          <TagTable
            tags={units}
            onDelete={handleDelete}
            isPending={isPending}
          />
        </Box>
      )}
    </Box>
  );
};

export default Unit;
