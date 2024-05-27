import { IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { exportExcel } from "../utils/handlers/exportExcel";

const ButtonExportToExcel = ({
  data,
  fileName,
}: {
  data: any[];
  fileName: string;
}) => {
  const handleExportToExcel = () => {
    exportExcel(data, fileName);
  };
  return (
    <IconButton color={"success"} onClick={handleExportToExcel}>
      <FileDownloadIcon />
    </IconButton>
  );
};

export default ButtonExportToExcel;
