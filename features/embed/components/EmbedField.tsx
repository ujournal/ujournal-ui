import { TextInput, ActionIcon, Box, Tooltip } from "@mantine/core";
import { ChangeEvent, FC, useCallback, useRef } from "react";
import { IconCheck, IconPhotoUp, IconTrash } from "@tabler/icons";
import { Embed } from "features/embed/components/Embed";
import isUrl from "is-url";
import { useTranslation } from "react-i18next";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { capitalize, shuffle } from "lodash";
import { useIntervalPhrases } from "baza/hooks/useIntervalPhrases";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useImageUploaderFather } from "baza/hooks/useImageUploaderFather";
import { UrlMetadata } from "baza/hooks/useUrlMetadata";

const socialMediaNames = shuffle([
  "YouTube",
  "Vimeo",
  "Twitter",
  "Telegram",
  "Facebook",
  "Instagram",
  "SoundCloud",
  "Spotify",
]);

export const EmbedField: FC<{
  value: string;
  onChange: (value: string) => void;
  urlMetadata?: UrlMetadata;
}> = ({ value, onChange, urlMetadata }) => {
  const openRef = useRef<() => void>(null);
  const socialMediaName = useIntervalPhrases(socialMediaNames);
  const { t } = useTranslation();
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const uploadImage = useImageUploaderFather();

  const handleEmbedRemove = useCallback(() => {
    onChange("");
  }, [onChange]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.currentTarget.value);
    },
    [onChange]
  );

  const handleUploadClick = useCallback(() => {
    if (openRef.current) {
      openRef.current();
    }
  }, [openRef]);

  const handleFileUpload = useCallback(
    async (files: File[]) => {
      if (files.length > 0) {
        showNotification({
          id: "image-uploading",
          loading: true,
          message: "Uploading",
          autoClose: false,
          disallowClose: true,
        });

        try {
          const result = await uploadImage({ file: files[0] });

          if (result) {
            onChange(result.fileUrl);
          }

          updateNotification({
            id: "image-uploading",
            color: "teal",
            message: "OK",
            icon: <IconCheck size={16} />,
            autoClose: 2000,
          });
        } catch (error) {
          updateNotification({
            id: "image-uploading",
            color: "red",
            message: `Oops. Something went wrong`,
            icon: <IconCheck size={16} />,
            autoClose: 2000,
          });
        }
      }
    },
    [onChange, uploadImage]
  );

  return (
    <>
      <Dropzone.FullScreen
        accept={IMAGE_MIME_TYPE}
        onDrop={handleFileUpload}
        radius="md"
        openRef={openRef}
      >
        {capitalize(t("upload_image"))}
      </Dropzone.FullScreen>

      {isUrl(value) ? (
        <Box mx={smallerThanSm ? "-sm" : "-xl"} sx={{ position: "relative" }}>
          <Box sx={{ pointerEvents: "none" }}>
            <Embed
              src={value}
              title={urlMetadata?.data?.metadata.title.unwrapOr("")}
              description={urlMetadata?.data?.metadata.description.unwrapOr("")}
              thumbnail={urlMetadata?.data?.metadata.image.unwrapOr("")}
            />
          </Box>
          <ActionIcon
            variant="filled"
            onClick={handleEmbedRemove}
            radius="xl"
            sx={(theme) => ({
              position: "absolute",
              top: theme.spacing.sm,
              right: theme.spacing.sm,
            })}
            color="blue"
          >
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Box>
      ) : (
        <TextInput
          withAsterisk
          placeholder={`${socialMediaName} ${t("url")}`}
          value={value}
          onChange={handleChange}
          sx={{ flex: "1 1 0" }}
          styles={{
            input: {
              borderWidth: 0,
              paddingLeft: 8,
              paddingRight: 8,
              marginLeft: -8,
              marginRight: -8,
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.015)",
              },
            },
          }}
          rightSection={
            <Tooltip label={capitalize(t("upload_image"))}>
              <ActionIcon
                onClick={handleUploadClick}
                sx={{ backgroundColor: "#fff" }}
              >
                <IconPhotoUp size={24} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          }
          size="md"
        />
      )}
    </>
  );
};
