import { useCallback, useMemo } from "react";
import { useIbbImageUpload } from "./useIbbImageUpload";
import { usePictrsImageUpload } from "./usePictrsImageUpload";

export const useImageUploaderFather = () => {
  const uploadImageViaPictrsUploader = usePictrsImageUpload();
  const uploadImageViaIbbUploader = useIbbImageUpload();

  const uploaders = useMemo(
    () => [uploadImageViaPictrsUploader, uploadImageViaIbbUploader],
    [uploadImageViaIbbUploader, uploadImageViaPictrsUploader]
  );

  const upload = useCallback(
    async ({ file }: { file: File }) => {
      let error = undefined;

      for (let uploader of uploaders) {
        try {
          return await uploader.mutateAsync({ file });
        } catch (_error) {
          error = _error;
        }
      }

      throw error;
    },
    [uploaders]
  );

  return upload;
};
