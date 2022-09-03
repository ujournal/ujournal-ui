import { Box, Card, Title, Text, Stack, Group, ThemeIcon } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons";
import { EmbedComponentType } from "./types";

export const UrlEmbed: EmbedComponentType = ({
  src,
  title,
  description,
  thumbnail,
}) => {
  const heading = [title, description].filter(Boolean);

  return (
    <Box p="md" component="a" href={src} target="_blank">
      <Card withBorder p="md" radius="md">
        <Group spacing="lg" noWrap>
          {thumbnail && (
            <Box
              component="img"
              src={thumbnail}
              alt={heading[0]}
              sx={{ objectFit: "contain", width: "100px" }}
            />
          )}
          <Stack spacing="sm">
            <Title size="h5">{heading[0]}</Title>
            {heading[1] && <Text size="sm">{heading[1]}</Text>}
            {src && (
              <Group noWrap spacing="sm">
                <ThemeIcon
                  color="gray"
                  variant="outline"
                  sx={{ border: "none" }}
                >
                  <IconExternalLink stroke={1.5} />
                </ThemeIcon>
                <Text color="gray" size="sm">
                  {src}
                </Text>
              </Group>
            )}
          </Stack>
        </Group>
      </Card>
    </Box>
  );
};
