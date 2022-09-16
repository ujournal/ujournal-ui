import { TextInput, ActionIcon, Box, TextInputProps } from "@mantine/core";
import { ChangeEvent, FC, useCallback } from "react";
import { IconTrash } from "@tabler/icons";
import { Embed } from "features/embed/components/Embed";
import isUrl from "is-url";
import { useTranslation } from "react-i18next";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { shuffle } from "lodash";
import { useIntervalPhrases } from "baza/hooks/useIntervalPhrases";
import { UrlMetadata } from "baza/hooks/useUrlMetadata";
import { UploadImageButton } from "baza/components/UploadImageButton";
import { isPostUrlPlaceholder } from "features/post/utils/postUrl";

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

export const EmbedField: FC<
  {
    value: string;
    onChange: (value: string) => void;
    urlMetadata?: UrlMetadata;
  } & TextInputProps
> = ({ value, onChange, urlMetadata, ...inputProps }) => {
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

  return (
    <>
      {!isPostUrlPlaceholder(value) && isUrl(value) ? (
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
          value={!isPostUrlPlaceholder(value) ? value : ""}
          onChange={handleChange}
          sx={{ flex: "1 1 0" }}
          styles={{
            input: {
              borderWidth: 0,
              paddingTop: 24,
              paddingBottom: 24,
              paddingLeft: 8,
              paddingRight: 8,
              marginLeft: -8,
              marginRight: -8,
              backgroundColor: "transparent",
            },
          }}
          rightSection={<UploadImageButton onUploaded={onChange} />}
          size="md"
          {...inputProps}
        />
      )}
    </>
  );
};
