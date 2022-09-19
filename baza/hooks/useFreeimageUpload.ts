import { useMutation } from "@tanstack/react-query";

export const useFreeimageUpload = ({
  fieldName = "source",
}: {
  fieldName?: string;
} = {}) => {
  return useMutation([], async ({ file }: { file: File }) => {
    const formData = new FormData();

    formData.append(fieldName, file);

    formData.append("action", "upload");
    // formData.append("expiration", "6M");
    formData.append("format", "json");
    formData.append("key", "6d207e02198a847aa98d0a2a901485a5");

    const response = await fetch("https://freeimage.host/api/1/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data?.image?.display_url) {
      const fileUrl = data?.image?.display_url;
      const fileDeleteUrl = data?.image?.delete_url;

      return { fileUrl, fileDeleteUrl };
    }
  });
};
