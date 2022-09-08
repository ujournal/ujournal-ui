import { useMutation } from "@tanstack/react-query";

export const useIbbImageUpload = ({
  fieldName = "source",
}: {
  fieldName?: string;
} = {}) => {
  return useMutation([], async ({ file }: { file: File }) => {
    const formData = new FormData();

    formData.append(fieldName, file);

    formData.append("action", "upload");
    formData.append("expiration", "6M");
    formData.append("type", "file");

    const response = await fetch("https://imgbb.com/json", {
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
