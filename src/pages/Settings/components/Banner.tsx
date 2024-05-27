import { Box, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { getBaseImage } from "../../../utils/handlers/getBaseImage";

export default function Banner() {
  const [image, setImage] = useState("");

  const handleAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageBase64 = await getBaseImage(e);
    imageBase64 && setImage(imageBase64[0].data?.toString()!);
  };
  return (
    <Box>
      <img
        alt="category"
        src={image}
        style={{
          width: 700,
          height: 300,
          objectFit: "cover",
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
        <Typography color={"blue"} fontWeight={600}>
          Change image
        </Typography>
      </label>
    </Box>
  );
}
