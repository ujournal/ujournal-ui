import {
  Card,
  Group,
  Text,
  Box,
  Title,
  ActionIcon,
  Menu,
  Button,
  ThemeIcon,
} from "@mantine/core";
import { FC } from "react";
import { PostView } from "ujournal-lemmy-js-client";
import { useMarkdown } from "hooks/useMarkdown";
import {
  IconDots,
  IconFileZip,
  IconEye,
  IconTrash,
  IconCaretDown,
  IconCaretUp,
  IconMessageCircle2,
  IconArrowRight,
} from "@tabler/icons";
import { UserButton } from "features/user/components/UserButton";
import { CommunityButton } from "features/community/components/CommunityButton";
import { Some } from "@sniptt/monads";
import { Embed } from "features/embed/components/Embed";
import { useState } from "react";
import { useCallback } from "react";
import { Rate } from "components/Rate";
import { useBreakpoint } from "hooks/useBreakpoint";

export const Post: FC<
  PostView & { showBody?: boolean; showToogleBodyButton?: boolean }
> = ({ creator, community, post, counts, showBody = false }) => {
  const largerThanMd = useBreakpoint({ largerThan: "md" });
  const [_showBody, setShowBody] = useState<boolean>(showBody);
  const markdown = useMarkdown();

  const handleToggleShowBody = useCallback(() => {
    setShowBody(!_showBody);
  }, [_showBody]);

  return (
    <Card
      p={largerThanMd ? "lg" : "sm"}
      radius="md"
      withBorder
      style={{ borderColor: "rgba(0, 0, 0, 0.07)" }}
    >
      <Group position="apart">
        <Group noWrap sx={{ flex: "1 1 0", flexGrow: "unset" }} spacing="xs">
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
          <ThemeIcon
            color="gray"
            size="sm"
            variant="outline"
            sx={{ border: "none" }}
          >
            <IconArrowRight />
          </ThemeIcon>
          <CommunityButton
            image={community.icon.match<string | undefined>({
              some: (name) => name,
              none: undefined,
            })}
            label={Some(community.title).match<string>({
              some: (name) => name,
              none: () => community.name,
            })}
          />
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

      <Group position="apart" mt="md" mb="md">
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
                    },
              }}
            >
              <Text size="md">
                <Box
                  dangerouslySetInnerHTML={{ __html: markdown.render(body) }}
                  sx={{
                    "& p:first-child": {
                      marginTop: 0,
                    },
                    "& p:last-child": {
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
                  }}
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

      <Group position="apart" mt={largerThanMd ? "lg" : "sm"}>
        <Group noWrap sx={{ flex: "1 1 0", flexGrow: "unset" }} spacing="xs">
          <Button
            leftIcon={<IconMessageCircle2 stroke={1.5} />}
            variant="subtle"
          >
            Коментувати
          </Button>
        </Group>
        <Rate count={counts.score} />
      </Group>
    </Card>
  );
};
