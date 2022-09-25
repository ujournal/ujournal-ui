import { useCallback, useMemo } from "react";
// import { useFreeimageUpload } from "./useFreeimageUpload";
import { useIbbImageUpload } from "./useIbbImageUpload";
import { usePictrsImageUpload } from "./usePictrsImageUpload";

export const useImageUploaderFather = () => {
  const uploadImageViaPictrsUploader = usePictrsImageUpload();
  const uploadImageViaIbbUploader = useIbbImageUpload();
  // const uploadImageViaFreeimageUploader = useFreeimageUpload();

  const uploaders = useMemo(
    () => [
      // uploadImageViaFreeimageUploader,
      uploadImageViaPictrsUploader,
      uploadImageViaIbbUploader,
    ],
    [
      // uploadImageViaFreeimageUploader,
      uploadImageViaIbbUploader,
      uploadImageViaPictrsUploader,
    ]
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
