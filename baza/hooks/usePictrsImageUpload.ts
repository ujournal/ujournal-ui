import { useMutation } from "@tanstack/react-query";

export const usePictrsImageUpload = ({
  fieldName = "images[]",
}: {
  fieldName?: string;
} = {}) => {
  return useMutation([], async ({ file }: { file: File }) => {
    const formData = new FormData();

    formData.append(fieldName, file);

    const response = await fetch(process.env.NEXT_PUBLIC_PICTRS_API_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.msg === "ok") {
      const hash = data.files[0].file;
      const fileUrl = `${process.env.NEXT_PUBLIC_PICTRS_API_URL}/${hash}`;
      const deleteToken = data.files[0].delete_token;
      const deleteFileUrl = `${process.env.NEXT_PUBLIC_PICTRS_API_URL}/delete/${deleteToken}/${hash}`;

      return { fileUrl, deleteFileUrl };
    }
  });
};
