import {
  Box,
  Title,
  Text,
  Stack,
  Group,
  ThemeIcon,
  AspectRatio,
  Container,
} from "@mantine/core";
import { IconExternalLink, IconLink } from "@tabler/icons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { EmbedComponentType } from "../types";

export const UrlEmbed: EmbedComponentType = ({
  src,
  title,
  description,
  thumbnail,
}) => {
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const heading = [title, description].filter(Boolean);
  const [_thumbnail, setThumbnail] = useState<string | undefined>(thumbnail);

  const handleImageError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      if (event.target instanceof HTMLImageElement) {
        console.log("error");
        setThumbnail(undefined);
      }
    },
    []
  );

  useEffect(() => {
    setThumbnail(thumbnail);
  }, [thumbnail]);

  return (
    <Box
      component="a"
      href={src}
      target="_blank"
      rel="norefferer"
      sx={{ display: "block" }}
      p={smallerThanSm ? "xs" : "lg"}
    >
      <Container size={650} p={0}>
        <Stack spacing={"xs"}>
          <Group spacing="lg" noWrap>
            <Box
              sx={{
                minWidth: "20%",
              }}
            >
              <AspectRatio ratio={16 / 9}>
                {_thumbnail ? (
                  <Box
                    component="img"
                    src={_thumbnail}
                    alt={heading[0]}
                    sx={(theme) => ({
                      objectFit: "cover",
                      backgroundColor: theme.colors.blue[1],
                      borderRadius: theme.radius.sm,
                    })}
                    onError={handleImageError}
                  />
                ) : (
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.colors.blue[1],
                      borderRadius: theme.radius.sm,
                    })}
                  >
                    <ThemeIcon
                      color="blue"
                      variant="outline"
                      sx={{ border: "none" }}
                      size="xl"
                    >
                      <IconLink stroke={1.5} />
                    </ThemeIcon>
                  </Box>
                )}
              </AspectRatio>
            </Box>
            <Stack spacing={4}>
              {heading[0] && <Title size="h5">{heading[0]}</Title>}
              {src && (
                <Group noWrap spacing={6}>
                  <ThemeIcon
                    color="gray"
                    variant="outline"
                    sx={{ border: "none" }}
                    size="sm"
                  >
                    <IconExternalLink stroke={1.5} />
                  </ThemeIcon>
                  <Text color="gray" size="sm">
                    {new URL(src).hostname.replace(/^www\./, "")}
                  </Text>
                </Group>
              )}
            </Stack>
          </Group>
          {heading[1] && <Text size="sm">{heading[1]}</Text>}
        </Stack>
      </Container>
    </Box>
  );
};
