import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { CategoryType } from "../../../types/categoryType";
import { TagType } from "../../../types/tagType";
import { RootState } from "../../../redux/store";
import { InitialShop, ShopType } from "../../../types/shopType";
import { setShopModal } from "../../../redux/slices/shopSlice";
import { getBaseImage } from "../../../utils/handlers/getBaseImage";
import { imageUpload } from "../../../utils/handlers/imageUploadClound";
import { shopActions } from "../../../actions/shopActions";
import SelectUser from "../../../components/SelectUser";
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
  width: "60%",
  height: 800,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
};

export interface DataSelect {
  categories: Array<CategoryType>;
  tags: Array<TagType>;
}

const initialError = {
  name: "",
  bio: "",
  description: "",
  startYear: "",
};

const ShopModal = () => {
  const dispatch = useAppDispatch();
  const { open, data } = useAppSelector((state: RootState) => state.shop.modal);
  const loading = useAppSelector((state: RootState) => state.shop.loading);

  const [shop, setShop] = useState<ShopType>(data ?? InitialShop);
  const [errText, setErrText] = useState(initialError);
  const [image, setImage] = useState<string>();
  const [userSelected, setUserSelected] = useState<string>("");

  // handle close modal
  const handleClose = () => {
    setErrText(initialError);
    setShop(InitialShop);
    dispatch(setShopModal({ open: false }));
  };

  // handle update avatar user
  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const baseImage = await getBaseImage(e);
    if (baseImage && baseImage.length > 0) {
      setImage(baseImage[0].data as string);
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newShop: ShopType = {
      user: userSelected,
      image: image ? await imageUpload(image) : "",
      name: formData.get("name") as string,
      bio: formData.get("bio") as string,
      description: formData.get("description") as string,
      startYear: Number(formData.get("startYear")),
    };

    let err = false;
    if (newShop.name.trim().length < 3) {
      setErrText((prev) => ({
        ...prev,
        name: "Shop Name must be leat at 3 characters long",
      }));
      err = true;
    }
    if (newShop.bio.trim().length < 3) {
      setErrText((prev) => ({
        ...prev,
        bio: "Biography must be leat 3 characters long",
      }));
      err = true;
    }
    if (newShop.description.trim().length < 10) {
      setErrText((prev) => ({
        ...prev,
        description: "Invalid description",
      }));
      err = true;
    }
    if (
      newShop.startYear < 1978 ||
      newShop.startYear > new Date().getFullYear()
    ) {
      setErrText((prev) => ({
        ...prev,
        startYear: "Invalid start year",
      }));
      err = true;
    }

    if (err) return;
    setErrText(initialError);

    !data
      ? dispatch(shopActions.create(newShop))
          .unwrap()
          .then(() => {
            dispatch(setShopModal({ open: false }));
          })
          .catch((err: any) => {
            err?.errors?.length &&
              err?.errors.forEach((e: any) => {
                switch (e.path) {
                  case "name":
                    setErrText((prev) => ({
                      ...prev,
                      name: e.msg,
                    }));
                    break;
                  default:
                    break;
                }
              });
          })
      : dispatch(shopActions.update(newShop))
          .unwrap()
          .then(() => {
            dispatch(setShopModal({ open: false }));
          });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component={"form"} onSubmit={handleSubmit}>
        <Typography align="center" fontWeight={600} fontSize={32} m={2}>
          {data ? "Update" : "Create"} shop
        </Typography>

        <input
          accept="image/*"
          id="contained-button-file"
          hidden
          type="file"
          onChange={onChangeImage}
          multiple={false}
        />

        <Typography align="center" fontSize={18}>
          Avatar
        </Typography>
        <IconButton sx={{ width: "max-content", mx: "auto" }}>
          <label htmlFor="contained-button-file">
            <Avatar
              src={image || data?.image}
              alt={"avatar"}
              sx={{ width: 150, height: 150 }}
            />
          </label>
        </IconButton>

        <SelectUser
          userSelected={userSelected}
          setUserSelected={setUserSelected}
        />

        <TextField
          label="Shop Name"
          required
          name="name"
          fullWidth
          margin="normal"
          error={errText.name !== ""}
          helperText={errText.name}
        />
        <TextField
          label="Biography"
          name="bio"
          fullWidth
          margin="normal"
          error={errText.bio !== ""}
          helperText={errText.bio}
        />
        <TextField
          multiline={true}
          label="Description"
          name="description"
          fullWidth
          required
          margin="normal"
          error={errText.description !== ""}
          helperText={errText.description}
        />
        <TextField
          label="Start Year"
          name="startYear"
          margin="normal"
          defaultValue={shop.startYear}
          type="number"
          error={errText.startYear !== ""}
          helperText={errText.startYear}
        />

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
            type="submit"
          >
            {data ? "Update" : "Create"}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ShopModal;
