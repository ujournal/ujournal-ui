import {
  Box,
  Card,
  Container,
  Group,
  Stack,
  ThemeIcon,
  Text,
  Button,
} from "@mantine/core";
import { IconChevronDown, IconMessageCircle2 } from "@tabler/icons";
import { DataList } from "baza/components/DataList";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { capitalize } from "baza/utils/string";
import Link from "next/link";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { PostView } from "ujournal-lemmy-js-client";

const PostEditionItem: FC<PostView> = ({ post, counts }) => {
  return (
    <Link href={{ pathname: "/post", query: { postId: post.id } }} passHref>
      <Box component="a">
        <Box component="span" sx={{ marginRight: 8 }}>
          {post.name}
        </Box>
        <Group
          spacing={2}
          sx={{
            display: "inline-flex",
            lineHeight: 1,
            verticalAlign: "middle",
            whiteSpace: "nowrap",
            fontSize: 12,
            fontWeight: "bold",
            alignItems: "center",
          }}
          noWrap
        >
          <ThemeIcon
            variant="outline"
            sx={{ border: "none" }}
            size="xs"
            color="gray"
          >
            <IconMessageCircle2 stroke={1.5} />
          </ThemeIcon>
          <Text color="gray">{counts.comments}</Text>
        </Group>
      </Box>
    </Link>
  );
};

export const PostEdition: FC<{
  onNextPage?: () => void;
  data: any[];
  isFetching: boolean;
  isLoading: boolean;
}> = ({ onNextPage, data, isFetching, isLoading }) => {
  const { t } = useTranslation();
  const largerThanSm = useBreakpoint({ largerThan: "sm" });

  const handleNextPage = useCallback(async () => {
    if (onNextPage) {
      onNextPage();
    }
  }, [onNextPage]);

  if (data.length === 0) {
    return null;
  }

  return (
    <Container size={690} p={0} sx={{ width: "100%" }}>
      <Card
        radius={largerThanSm ? "md" : 0}
        withBorder={false}
        mx={largerThanSm ? undefined : "-md"}
      >
        <Stack spacing="xs">
          <DataList
            data={data}
            itemComponent={PostEditionItem}
            itemKey="post.id"
          />
          {onNextPage && (
            <Box>
              <Button
                variant="subtle"
                styles={{
                  root: {
                    padding: 0,
                    height: "auto",
                    color: "black",
                    ":hover": { backgroundColor: "transparent" },
                    display: "inline-block",
                  },
                  inner: { justifyContent: "flex-start" },
                  rightIcon: { marginLeft: 4 },
                }}
                onClick={handleNextPage}
                loading={isFetching || isLoading}
                rightIcon={<IconChevronDown stroke={1.5} size={12} />}
                sx={(theme) => ({
                  color:
                    theme.colorScheme === "light"
                      ? theme.colors.gray[9]
                      : theme.colors.gray[3],
                  backgroundColor: "transparent",
                })}
              >
                {capitalize(t("more"))}
              </Button>
            </Box>
          )}
        </Stack>
      </Card>
    </Container>
  );
};
