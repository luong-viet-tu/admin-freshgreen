import * as exceljs from "exceljs";
import toast from "react-hot-toast";
export const exportExcel = async (
  data: any[],
  fileName: string
): Promise<void> => {
  if (data.length === 0) {
    toast.error("Không có dữ liệu");
    return;
  }

  const workbook: exceljs.Workbook = new exceljs.Workbook();
  const worksheet: exceljs.Worksheet = workbook.addWorksheet("Sheet 1");

  const labelKeys = Object.keys(data[0]);
  worksheet.addRow(labelKeys);

  data.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.xlsx`;

  a.click();

  URL.revokeObjectURL(url);
};
