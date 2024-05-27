import { useEffect, useState } from "react";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";
import { Box } from "@mui/material";
import { categoryActions } from "../../actions/categoryActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { CategoryType } from "../../types/categoryType";
import { imageUpload } from "../../utils/handlers/imageUploadClound";
import { NotificationToast } from "../../utils/handlers/NotificationToast";
import AddImage from "./components/AddImage";

const Categories = () => {
  const [category, setCategory] = useState<string>("");
  const [categoryErrText, setCategoryErrText] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);

  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state: RootState) => state.category.categories
  );
  const loading = useAppSelector((state: RootState) => state.category.loading);

  useEffect(() => {
    dispatch(categoryActions.gets());
  }, [dispatch]);

  const handleCreate = async () => {
    if (category === "")
      return setCategoryErrText("Bạn chưa nhập thêm thể loại");
    if (!image)
      return NotificationToast({ message: "Yêu cầu thêm ảnh", type: "error" });
    const data = {
      name: category,
      image: await imageUpload(image),
    };
    dispatch(categoryActions.create(data));
    setCategory("");
    setImage("");
  };

  const handleDelete = async (category: CategoryType) => {
    setIsPending(true);
    dispatch(categoryActions.delete(category));
    setIsPending(false);
  };
  return (
    <Box display={"flex"} gap={10} justifyContent={"center"} padding={10}>
      <Box
        display={"flex"}
        gap={10}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        width={"50%"}
      >
        <AddImage image={image} setImage={setImage} />
        <CategoryForm
          category={category}
          setCategory={setCategory}
          onChange={handleCreate}
          categoryErrText={categoryErrText}
          isLoading={loading}
        />
      </Box>

      <Box width={"50%"}>
        <CategoryTable
          categories={categories}
          onDelete={handleDelete}
          isPending={isPending}
        />
      </Box>
    </Box>
  );
};

export default Categories;
