import {
  Card,
  Group,
  Text,
  Box,
  Title,
  ActionIcon,
  Menu,
  Button,
  Tooltip,
} from "@mantine/core";
import { FC, MutableRefObject } from "react";
import { PostView } from "ujournal-lemmy-js-client";
import { useMarkdown } from "baza/hooks/useMarkdown";
import {
  IconDots,
  IconFileZip,
  IconEye,
  IconTrash,
  IconCaretDown,
  IconCaretUp,
  IconMessageCircle2,
} from "@tabler/icons";
import { UserButton } from "features/user/components/UserButton";
import { CommunityButton } from "features/community/components/CommunityButton";
import { Some } from "@sniptt/monads";
import { Embed } from "features/embed/components/Embed";
import { useState } from "react";
import { useCallback } from "react";
import { Rate } from "baza/components/Rate";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { formatShortNum } from "baza/utils/number";
import { useIntersection } from "@mantine/hooks";
import { DateFormatted } from "baza/components/DeteFormatted";

export const Post: FC<
  PostView & {
    showBody?: boolean;
    showToogleBodyButton?: boolean;
    containerRef?: MutableRefObject<HTMLDivElement>;
  }
> = ({ creator, community, post, counts, showBody = false, containerRef }) => {
  const smallerThanSm = useBreakpoint({ smallerThan: "sm" });
  const largerThanMd = useBreakpoint({ largerThan: "md" });
  const [_showBody, setShowBody] = useState<boolean>(showBody);
  const markdown = useMarkdown();
  const { t } = useTranslation();

  const { ref, entry } = useIntersection({
    // root: containerRef ? containerRef.current : undefined,
    threshold: 0,
  });

  const handleToggleShowBody = useCallback(() => {
    setShowBody(!_showBody);
  }, [_showBody]);

  return (
    <Card
      p={largerThanMd ? "lg" : "sm"}
      radius={smallerThanSm ? 0 : "md"}
      withBorder={false}
      style={{
        position: "relative",
        borderColor: "rgba(0, 0, 0, 0.07)",
        borderLeftWidth: smallerThanSm ? 0 : undefined,
        borderRightWidth: smallerThanSm ? 0 : undefined,
      }}
      ref={ref}
      shadow="xs"
    >
      <Group position="apart" mt="-xs">
        <Group
          noWrap
          sx={{ flex: "1 1 0", flexGrow: "unset" }}
          spacing="xs"
          mx="-xs"
        >
          <CommunityButton
            image={community.icon.match<string | undefined>({
              some: (name) => name,
              none: undefined,
            })}
            label={Some(community.title).match<string>({
              some: (name) => name,
              none: () => community.name,
            })}
            weight={600}
          />
          <UserButton
            image={creator.avatar.match<string | undefined>({
              some: (name) => name,
              none: undefined,
            })}
            label={creator.display_name.match<string>({
              some: (name) => name,
              none: () => creator.name,
            })}
          />
          <DateFormatted date={new Date(post.published)} />
        </Group>

        <Menu withinPortal position="bottom-end" shadow="sm">
          <Menu.Target>
            <ActionIcon>
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item icon={<IconFileZip size={14} />}>Download zip</Menu.Item>
            <Menu.Item icon={<IconEye size={14} />}>Preview all</Menu.Item>
            <Menu.Item icon={<IconTrash size={14} />} color="red">
              Delete all
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Group position="apart" mt="xs" mb="md">
        <Title size="h3" weight={600}>
          {post.name}
        </Title>
      </Group>

      <Card.Section>
        {post.url.match({
          some: (url) => (
            <Embed
              src={url}
              title={post.embed_title.unwrapOr("")}
              description={post.embed_description.unwrapOr("")}
              thumbnail={post.thumbnail_url.unwrapOr("")}
            />
          ),
          none: undefined,
        })}
      </Card.Section>

      {post.body.match({
        some: (body) => (
          <>
            <Box
              mt={largerThanMd ? "lg" : "sm"}
              mx="-lg"
              px="lg"
              sx={{
                position: "relative",
                maxHeight: _showBody ? undefined : "100px",
                overflow: _showBody ? undefined : "hidden",
                "&:after": _showBody
                  ? undefined
                  : {
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      width: "100%",
                      height: "100%",
                      content: "''",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                      pointerEvents: "none",
                    },
              }}
            >
              <Text size="md">
                <Box
                  dangerouslySetInnerHTML={{ __html: markdown.render(body) }}
                  sx={(theme) => ({
                    "& a": {
                      textDecoration: "underline",
                      textDecorationColor: theme.colors.blue[1],
                      color: theme.colors.blue,
                    },
                    "& > p:first-of-type": {
                      marginTop: 0,
                    },
                    "& > p:last-child": {
                      marginBottom: 0,
                    },
                    "& p:empty": {
                      display: "none",
                    },
                    "& img": {
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      maxWidth: "100%",
                      maxHeight: "60vh",
                    },
                    "& .image": {
                      backgroundColor: "rgba(0,0,0,0.05)",
                      marginLeft: -20,
                      marginRight: -20,
                    },
                    "& blockquote": {
                      backgroundColor: theme.colors.blue[0],
                      padding: theme.spacing.xl,
                      marginLeft: largerThanMd
                        ? -theme.spacing.lg
                        : -theme.spacing.sm,
                      marginRight: largerThanMd
                        ? -theme.spacing.lg
                        : -theme.spacing.sm,
                      fontSize: theme.fontSizes.xl,
                      fontWeight: 600,
                      "& p:first-of-type": {
                        marginTop: 0,
                      },
                      "& p:last-child": {
                        marginBottom: 0,
                      },
                    },
                  })}
                />
              </Text>
            </Box>
            {!showBody && (
              <Button
                variant="light"
                radius="md"
                onClick={handleToggleShowBody}
                fullWidth
                mt="md"
                size="xs"
                sx={(theme) => ({
                  backgroundColor: theme.fn.rgba(theme.colors.blue[0], 0.5),
                })}
              >
                {_showBody ? (
                  <IconCaretUp stroke={1.5} />
                ) : (
                  <IconCaretDown stroke={1.5} />
                )}
              </Button>
            )}
          </>
        ),
        none: undefined,
      })}

      <Group
        position="apart"
        mt="xs"
        ml="-xs"
        mb={largerThanMd ? "-xs" : undefined}
      >
        <Group noWrap sx={{ flex: "1 1 0", flexGrow: "unset" }} spacing="xs">
          <Tooltip
            label={t("number_of_comments", {
              count: counts.comments,
              formattedCount: counts.comments,
            })}
            openDelay={1000}
          >
            <Button
              leftIcon={<IconMessageCircle2 stroke={1.5} />}
              variant="subtle"
            >
              {t("number_of_comments", {
                count: counts.comments,
                formattedCount: formatShortNum(counts.comments),
              })}
            </Button>
          </Tooltip>
        </Group>
        <Rate count={counts.score} />
      </Group>
    </Card>
  );
};
