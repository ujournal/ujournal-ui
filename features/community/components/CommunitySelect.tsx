import {
  Avatar,
  Box,
  Group,
  Select,
  SelectProps,
  Stack,
  Text,
} from "@mantine/core";
import { IconSpeakerphone } from "@tabler/icons";
import { MarkdownText } from "baza/components/MarkdownText";
import { capitalize } from "lodash";
import { FC, ForwardedRef, forwardRef, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useCommunities } from "../hooks/useCommunities";

export const CommunitySelect: FC<
  Omit<SelectProps, "onChange"> & { onChange: (value: number) => void }
> = ({ onChange, ...props }) => {
  const communities = useCommunities({ limit: 1000 });
  const { t } = useTranslation();

  const communitiesOptions = useMemo(
    () =>
      communities.data?.communities.map(({ community }) => ({
        image: community.icon.unwrapOr(""),
        value: community.id.toString(),
        label: community.title,
        description: community.description.unwrapOr(""),
      })) || [],
    [communities.data]
  );

  const icon = useMemo(() => {
    if (props.value) {
      const option = communitiesOptions.find(
        ({ value }) => value.toString() === props.value?.toString()
      );

      if (option) {
        return (
          <Avatar src={option.image} size={24} mr="xs">
            <IconSpeakerphone stroke={1.5} />
          </Avatar>
        );
      }
    }

    return undefined;
  }, [communitiesOptions, props.value]);

  const handleSelectChange = useCallback(
    (value: string) => {
      onChange(Number(value));
    },
    [onChange]
  );

  return (
    <Select
      placeholder={capitalize(t("select_a_community"))}
      searchable
      {...props}
      value={props.value?.toString()}
      onChange={handleSelectChange}
      itemComponent={SelectItem}
      data={communitiesOptions}
      icon={icon}
    />
  );
};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

const SelectItemWithoutRef = (
  { image, label, description, ...others }: ItemProps,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <Box ref={ref} {...others}>
    <Group noWrap>
      <Avatar size={24} src={image}>
        <IconSpeakerphone stroke={1.5} />
      </Avatar>

      <Stack spacing="xs">
        <Text size="sm" m={0}>
          {label}
        </Text>
        {description && (
          <Text size="xs" component="div" color="dimmed" mt={"-xs"}>
            <MarkdownText text={description} />
          </Text>
        )}
      </Stack>
    </Group>
  </Box>
);

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(SelectItemWithoutRef);
