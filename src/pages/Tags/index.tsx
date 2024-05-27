import { useEffect, useState } from "react";
import TagForm from "./components/TagForm";
import TagTable from "./components/TagTable";
import { Box, CircularProgress } from "@mui/material";
import { TagActionsType, tagActions } from "../../actions/tagActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const Tags = () => {
  const [tag, setTag] = useState<string>("");
  const [tagErrText, settagErrText] = useState<string>("");
  const [isPending, setIsPending] = useState(false);

  const loading = useAppSelector((state) => state.tag.isLoading);
  const tags = useAppSelector((state: RootState) => state.tag.tags);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tagActions.gets());
  }, [dispatch]);

  const handleChange = async () => {
    if (tag === "") {
      settagErrText("Bạn chưa nhập thêm thể loại");
      return;
    }
    dispatch(tagActions.create({ name: tag }));
    setTag("");
  };

  const handleDelete = async (tag: TagActionsType) => {
    setIsPending(true);
    dispatch(tagActions.delete(tag));
    setIsPending(false);
  };
  return (
    <Box display={"flex"} gap={10} justifyContent={"center"}>
      <TagForm
        tag={tag}
        setTag={setTag}
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
          <TagTable tags={tags} onDelete={handleDelete} isPending={isPending} />
        </Box>
      )}
    </Box>
  );
};

export default Tags;
