import { ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography } from "@mui/material";
import { getBaseImage } from "../../../utils/handlers/getBaseImage";

interface Props {
  image: string | undefined;
  setImage: (image: string) => void;
}

const AddImage = (props: Props) => {
  const { image, setImage } = props;

  const handleAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageBase64 = await getBaseImage(e);

    imageBase64 && setImage(imageBase64[0].data?.toString()!);
  };

  return image ? (
    <Box>
      <label htmlFor="contained-button-file" style={{ cursor: "pointer" }}>
        <img
          alt="category"
          src={image}
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
          }}
        />
        <input
          accept="image/*"
          id="contained-button-file"
          hidden
          type="file"
          onChange={handleAddImage}
          multiple={false}
        />
        <Typography color={"blue"}>Change image</Typography>
      </label>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
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
    </Box>
  );
};

export default AddImage;
