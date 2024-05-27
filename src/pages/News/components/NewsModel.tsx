import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import SelectCategoryNews from "../../../components/SelectCategory";
import { ChangeEvent, memo, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { CategoryType } from "../../../types/categoryType";
import { TagType } from "../../../types/tagType";
import SelectTagsNews from "../../../components/SelectTags";
import { categoryActions } from "../../../actions/categoryActions";
import { tagActions } from "../../../actions/tagActions";
import { NotificationToast } from "../../../utils/handlers/NotificationToast";
import { RootState } from "../../../redux/store";
import { newsActions } from "../../../actions/newsActions";
import { NewNewsType } from "../../../types/newsType";
import { setNewsModel } from "../../../redux/slices/newsSlice";
import Editor from "../../../components/common/Editor";
import AddIcon from "@mui/icons-material/Add";
import { getBaseImage } from "../../../utils/handlers/getBaseImage";
import { imageUpload } from "../../../utils/handlers/imageUploadClound";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: 2,
  p: 4,
  width: "70%",
  height: 900,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
};

export interface DataSelect {
  categories: Array<CategoryType>;
  tags: Array<TagType>;
}

const initialError = {
  title: "",
  category: "",
  tag: "",
  content: "",
};

const NewsModel = () => {
  const { open, data } = useAppSelector((state: RootState) => state.news.modal);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.news.isLoading);
  const userId = useAppSelector((state: RootState) => state.user.user?._id);

  const [title, setTitle] = useState<string>(data?.title ?? "");
  const [errText, setErrText] = useState(initialError);
  const [content, setContent] = useState<string>(data?.content ?? "");
  const [dataSelect, setDataSelect] = useState<DataSelect>({
    categories: [],
    tags: [],
  });
  const [category, setCategory] = useState<string>(data?.category ?? "");
  const [tags, setTags] = useState<TagType[]>(data ? data.tags : []);
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);
  const [image, setImage] = useState("");
  // get data select
  useEffect(() => {
    const getData = async () => {
      const [categories, tags] = await Promise.all([
        dispatch(categoryActions.gets()).unwrap(),
        dispatch(tagActions.gets()).unwrap(),
      ]);
      if (categories && tags) {
        setDataSelect({
          categories,
          tags: tags,
        });
      }
    };
    getData();
  }, [dispatch]);

  // handle close modal
  const handleClose = () => {
    setErrText(initialError);
    setTitle("");
    setImage("");
    setContent("");
    setTags([]);
    setCategory("");
    setTagsSelected([]);
    dispatch(setNewsModel({ open: false }));
  };

  // handle category change
  const handleCategorySelect = (e: string) => {
    setCategory(e);
  };

  // handle select tags
  const handleTagsSelect = (e: any) => {
    setTagsSelected(e);
    setTags(e.map((name: string) => ({ name })));
  };

  const handleAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageBase64 = await getBaseImage(e);

    imageBase64 && setImage(imageBase64[0].data?.toString()!);
  };

  const handlePostNews = async () => {
    const newsData: NewNewsType = {
      _id: data?._id,
      title: title || (data ? data.title : ""),
      category: category !== "" ? category : dataSelect.categories[0].name,
      tags: tags.length ? tags : data ? data.tags : [],
      thumbnail: (await imageUpload(image)) || (data ? data?.thumbnail : ""),
      content: content || (data ? data.content : ""),
      author: userId!,
    };

    if (newsData.title.length < 10) {
      setErrText((prev) => ({
        ...prev,
        title: "Invalid news title",
      }));
      return;
    }
    if (!newsData.tags.length) {
      setErrText((prev) => ({
        ...prev,
        tag: "Tags is required",
      }));
      return;
    }
    if (newsData.content.length < 50) {
      NotificationToast({
        message: "Content is Required and lester than 50 characters",
        type: "error",
      });
      return;
    }

    setErrText(initialError);

    dispatch(data ? newsActions.update(newsData) : newsActions.create(newsData))
      .unwrap()
      .then(() => {
        dispatch(setNewsModel({ open: false }));
      })
      .catch((err: any) => {
        err.errors &&
          err.errors.forEach((e: any) => {
            switch (e.path) {
              case "title":
                setErrText((prev) => ({
                  ...prev,
                  title: e.msg,
                }));
                break;
              case "content":
                setErrText((prev) => ({
                  ...prev,
                  content: e.msg,
                }));
                break;
              default:
                break;
            }
          });
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography align="center" fontWeight={600} fontSize={32} m={2}>
          {data ? "Update" : "Create"} news
        </Typography>

        <img
          alt="thumbnail"
          src={image}
          style={{
            width: 200,
            height: 200,
            objectFit: "cover",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <label htmlFor="contained-button-file" style={{ cursor: "pointer" }}>
          <input
            accept="image/*"
            id="contained-button-file"
            hidden
            type="file"
            onChange={handleAddImage}
            multiple={false}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "green",
              flexDirection: "column",
              width: "auto",
              height: 100,
            }}
          >
            <Typography align="center" fontWeight={600}>
              Add images
            </Typography>
            <AddIcon fontSize="large" />
          </Box>
        </label>

        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={data?.title ?? title}
            required
            error={errText.title !== ""}
            helperText={errText.title}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!dataSelect.categories.length ? (
              <CircularProgress />
            ) : (
              <SelectCategoryNews
                data={dataSelect.categories}
                errText={errText.category}
                onChange={handleCategorySelect}
                value={data?.category ?? category}
              />
            )}
            {!dataSelect.tags.length ? (
              <CircularProgress />
            ) : (
              <SelectTagsNews
                tagsData={dataSelect.tags}
                tagSelected={
                  !tagsSelected.length
                    ? data
                      ? data.tags.map((tag: TagType) => tag.name)
                      : []
                    : tagsSelected
                }
                handleSelectTags={handleTagsSelect}
                error={errText.tag}
              />
            )}
          </Box>
          <Editor content={data?.content ?? content} setContent={setContent} />
        </Box>

        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          mt={"auto"}
          gap={5}
        >
          <Button
            variant="outlined"
            color="warning"
            fullWidth
            onClick={handleClose}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            color="success"
            fullWidth
            loading={loading}
            onClick={handlePostNews}
          >
            {data ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(NewsModel);
