import { Box, Card, Title, Text, Stack, Group } from "@mantine/core";
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
        <Group spacing="md" noWrap>
          {thumbnail && (
            <Box
              component="img"
              src={thumbnail}
              alt={heading[0]}
              sx={{ objectFit: "contain", width: "100px" }}
            />
          )}
          <Stack spacing="md">
            <Title size="h5">{heading[0]}</Title>
            {heading[1] && <Text size="sm">{heading[1]}</Text>}
            {src && (
              <Text color="gray" size="sm">
                {src}
              </Text>
            )}
          </Stack>
        </Group>
      </Card>
    </Box>
  );
};
