import { Box, Card, Title, Text, Stack, Group, ThemeIcon } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { EmbedComponentType } from "./types";

export const UrlEmbed: EmbedComponentType = ({
  src,
  title,
  description,
  thumbnail,
}) => {
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const heading = [title, description].filter(Boolean);

  return (
    <Box
      component="a"
      href={src}
      target="_blank"
      rel="norefferer"
      sx={{ display: "block" }}
    >
      <Card withBorder p="md" radius="md">
        <Group spacing="lg" noWrap={smallerThanSm ? undefined : true}>
          {thumbnail && (
            <Box
              component="img"
              src={thumbnail}
              alt={heading[0]}
              sx={{
                objectFit: "contain",
                width: smallerThanSm ? "100%" : "100px",
                height: smallerThanSm ? "100px" : undefined,
                backgroundColor: "rgba(0,0,0,0.05)",
              }}
            />
          )}
          <Stack spacing="sm">
            <Title size="h5">{heading[0]}</Title>
            {heading[1] && <Text size="sm">{heading[1]}</Text>}
            {src && (
              <Group noWrap spacing="xs">
                <ThemeIcon
                  color="gray"
                  variant="outline"
                  sx={{ border: "none" }}
                  size="sm"
                >
                  <IconExternalLink stroke={1.5} />
                </ThemeIcon>
                <Text color="gray" size="sm">
                  {new URL(src).hostname}
                </Text>
              </Group>
            )}
          </Stack>
        </Group>
      </Card>
    </Box>
  );
};
