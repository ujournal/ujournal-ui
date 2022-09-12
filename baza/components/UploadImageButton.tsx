import { FC, useCallback, useRef } from "react";
import { Dropzone } from "@mantine/dropzone";
import { showFail, showProgress, showSuccess } from "baza/utils/notifications";
import { useImageUploaderFather } from "baza/hooks/useImageUploaderFather";
import { capitalize } from "baza/utils/string";
import { Tooltip, ActionIcon, Loader, ActionIconProps } from "@mantine/core";
import { IconPhotoUp } from "@tabler/icons";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";

export const UploadImageButton: FC<
  {
    onUploaded: (fileUrl: string) => void;
  } & ActionIconProps
> = ({ onUploaded, ...props }) => {
  const { t } = useTranslation();
  const openRef = useRef<() => void>(null);
  const uploadImage = useImageUploaderFather();

  const uploadMutation = useMutation(
    ["imageUploading", onUploaded, uploadImage],
    async (files: File[]) => {
      if (files.length > 0) {
        showProgress("imageUploading");

        try {
          const result = await uploadImage({ file: files[0] });

          if (result) {
            onUploaded(result.fileUrl);
          }

          showSuccess("imageUploading");
        } catch (error) {
          showFail("imageUploading");
        }
      }
    }
  );

  const handleUploadClick = useCallback(() => {
    if (openRef.current) {
      openRef.current();
    }
  }, [openRef]);

  return (
    <>
      <Dropzone.FullScreen
        accept={["image/*"]}
        onDrop={uploadMutation.mutateAsync}
        radius="md"
        openRef={openRef}
      >
        {capitalize(t("upload_image"))}
      </Dropzone.FullScreen>
      <Tooltip label={capitalize(t("upload_image"))}>
        <ActionIcon
          sx={{ backgroundColor: "#fff" }}
          {...props}
          onClick={handleUploadClick}
          disabled={uploadMutation.isLoading}
        >
          {uploadMutation.isLoading ? (
            <Loader size="sm" color="gray" />
          ) : (
            <IconPhotoUp size={24} stroke={1.5} />
          )}
        </ActionIcon>
      </Tooltip>
    </>
  );
};
