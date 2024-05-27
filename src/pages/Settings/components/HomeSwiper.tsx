import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { NotificationToast } from "../../../utils/handlers/NotificationToast";
import { getBaseImage } from "../../../utils/handlers/getBaseImage";
import { mainColor } from "../../../resources/color";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { LoadingButton } from "@mui/lab";
import { settingsActions } from "../../../actions/settingActions";
import { imageUpload } from "../../../utils/handlers/imageUploadClound";
import { UserType } from "../../../types/userType";
import { SettingsType } from "../../../types/settingsType";
import { useAppDispatch } from "../../../redux/hooks";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
interface Props {
  settings: SettingsType;
  user: UserType;
}
const HomeSwiper = (props: Props) => {
  const { settings, user } = props;

  const [images, setImages] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(settingsActions.getSetting(user._id!));
  }, [dispatch, user._id]);

  const handleAddImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const imagesBase64 = await getBaseImage(e);

    if (!imagesBase64) {
      return;
    }

    const newImageUrls = imagesBase64.map((image) => image.data as string);
    setImages([...images, ...newImageUrls]);
  };

  const handleRemoveImage = (image: string) => {
    const imagesUpdated = [...images];
    imagesUpdated.forEach((imageCurrent, index) => {
      if (imageCurrent === image) {
        imagesUpdated.splice(index, 1);
      }
    });
    setImages(imagesUpdated);
  };

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      const uploadImgs = await Promise.all(
        images.map((image) => imageUpload(image))
      );

      if (!uploadImgs) {
        return;
      }

      const updatedSetting = {
        _id: settings._id!,
        adminID: user._id!,
        images: await uploadImgs,
      };

      await dispatch(settingsActions.updateSetting(updatedSetting));
      NotificationToast({ message: "Done", type: "success" });
    } catch (error) {
      console.error("Error during image upload or dispatch:", error);
      NotificationToast({ message: "Failure", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setImages([]);
  };

  return (
    <Paper sx={{ width: 800, padding: 5 }}>
      {isLoading && <LinearProgress />}
      <Typography>Total: {settings.banners?.images.length} images</Typography>
      <Box>
        <Swiper
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
        >
          {(images.length ? images : settings.banners?.images)?.map(
            (image: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  onClick={() => handleRemoveImage(image)}
                  src={image}
                  alt=""
                  style={{
                    width: 700,
                    height: 400,
                    objectFit: "cover",
                  }}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </Box>
      <label htmlFor="contained-button-file" style={{ cursor: "pointer" }}>
        <input
          accept="image/*"
          id="contained-button-file"
          hidden
          type="file"
          onChange={handleAddImages}
          multiple={true}
        />
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 18,
            color: mainColor,
            textAlign: "center",
            paddingTop: 5,
          }}
        >
          Add {images.length > 0 ? "more" : ""} images
        </Typography>
      </label>

      {images.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            paddingTop: 5,
            justifyContent: "center",
          }}
        >
          <Button variant="outlined" color="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            onClick={handleUpload}
          >
            Upload
          </LoadingButton>
        </Box>
      )}
    </Paper>
  );
};

export default HomeSwiper;
