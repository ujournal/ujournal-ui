import { TextInput, ActionIcon, Box, Tooltip } from "@mantine/core";
import { ChangeEvent, FC, useCallback, useEffect, useRef } from "react";
import { IconPhotoUp, IconTrash } from "@tabler/icons";
import { Embed } from "features/embed/components/Embed";
import isUrl from "validator/lib/isURL";
import { useTranslation } from "react-i18next";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { capitalize, shuffle } from "lodash";
import { useIntervalPhrases } from "baza/hooks/useIntervalPhrases";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useQuery } from "@tanstack/react-query";
import { useLemmyClient } from "baza/hooks/useLemmyClient";
import { GetSiteMetadata } from "ujournal-lemmy-js-client";

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
}> = ({ value, onChange }) => {
  const lemmyClient = useLemmyClient();

  const openRef = useRef<() => void>(null);

  const urlMetadata = useQuery(["urlMetadata", value], async () => {
    if (isUrl(value)) {
      return await lemmyClient.getSiteMetadata(
        new GetSiteMetadata({
          url: value,
        })
      );
    }

    return undefined;
  });

  const socialMediaName = useIntervalPhrases(socialMediaNames);

  const { t } = useTranslation();

  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });

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

  const handleFileUpload = useCallback(() => {}, []);

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
              title={urlMetadata.data?.metadata.title.unwrapOr("")}
              description={urlMetadata.data?.metadata.description.unwrapOr("")}
              thumbnail={urlMetadata.data?.metadata.image.unwrapOr("")}
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
