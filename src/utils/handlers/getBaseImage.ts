import { ChangeEvent } from "react";
import { NotificationToast } from "./NotificationToast";

export interface DataType {
  data: string | undefined | ArrayBuffer;
}

export const getBaseImage = async (
  e: ChangeEvent<HTMLInputElement>,
  maxWidth?: number,
  maxHeight?: number,
  resize?: boolean
) => {
  if (!e.target.files) return;
  const files = Array.from(e.target.files);

  const data: Array<DataType> = [];

  for (const file of files) {
    if (file.type.startsWith("image/")) {
      try {
        const resizedImage = await resizeImage(
          file,
          (maxWidth = 300),
          (maxHeight = 450)
        );
        const result = await readFile(resize ? resizedImage : file);
        data.push(result);
      } catch (error) {
        NotificationToast({
          message: `Error while processing image ${file.name}.`,
          type: "error",
        });
      }
    } else {
      NotificationToast({
        message: `File ${file.name} is not an image.`,
        type: "error",
      });
    }
  }

  return data;
};

const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        img.src = reader.result as string;
      } else {
        reject(new Error("Failed to read file."));
      }
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
            });
            resolve(resizedFile);
          } else {
            reject(new Error("Failed to resize image."));
          }
        }, file.type);
      } else {
        reject(new Error("Failed to create canvas context."));
      }
    };

    img.onerror = (err) => {
      reject(err);
    };
  });
};

const readFile = (file: File): Promise<DataType> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        const result: DataType = { data: reader.result };
        resolve(result);
      } else {
        reject(new Error("Failed to read file."));
      }
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
};
