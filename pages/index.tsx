import { SitePage } from "types";
import { PostList } from "features/post/components/PostList";
import { useCallback, useEffect, useMemo } from "react";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  FetchPostsParams,
  fetchPostsParamsDefault,
  usePostList,
} from "features/post/hooks/usePostList";
import { AppNavbar } from "features/app/components/AppNavbar";
import { AppAside } from "features/app/components/AppAside";
import { useNavLinks } from "features/app/hooks/useNavLinks";
import PullToRefresh from "react-simple-pull-to-refresh";
import Head from "next/head";
import { Box, Container, Menu, Stack, Tabs } from "@mantine/core";
import { RefreshContent } from "baza/components/PullToRefresh/RefreshContent";
import { PullDownContent } from "baza/components/PullToRefresh/PullDownContent";
import { PostEdition } from "features/post/components/PostEdition";
import { ListingType, SortType } from "ujournal-lemmy-js-client";
import { buildKeyFromParams } from "baza/utils/key";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { IconChevronDown } from "@tabler/icons";
import { SyntheticEvent } from "react";

const FeedPage: SitePage = () => {
  const { t } = useTranslation();
  const params = useRouterQuery<FetchPostsParams>({
    ...fetchPostsParamsDefault,
  });
  const posts = usePostList({ params });
  const navLinks = useNavLinks();
  const activeNavLink = useMemo(
    () => navLinks.find((item) => item.active),
    [navLinks]
  );
  const router = useRouter();
  const sortVariants = useMemo(
    () => [
      { value: SortType.Hot, label: t("hot") },
      { value: SortType.Active, label: t("active") },
      { value: SortType.New, label: t("new") },
    ],
    [t]
  );

  const sortOtherVariants = useMemo(
    () => [
      { value: SortType.TopDay, label: t("top_day") },
      { value: SortType.TopWeek, label: t("top_week") },
      { value: SortType.TopMonth, label: t("top_month") },
      { value: SortType.TopYear, label: t("top_year") },
      { value: SortType.TopAll, label: t("top_all") },
      { value: SortType.MostComments, label: t("most_comments") },
      { value: SortType.NewComments, label: t("new_comments") },
    ],
    [t]
  );

  const handleSortChange = useCallback(
    (value: SortType & "-1") => {
      if (value !== "-1") {
        router.push({ pathname: "/", query: { ...params, sort: value } });
      }
    },
    [params, router]
  );

  const handleMenuClick = useCallback(
    (event: SyntheticEvent<HTMLButtonElement>) => {
      const value =
        event.currentTarget instanceof HTMLButtonElement
          ? event.currentTarget.value
          : undefined;
      router.push({ pathname: "/", query: { ...params, sort: value } });
    },
    [params, router]
  );

  useEffect(() => {
    posts.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildKeyFromParams(params)]);

  return (
    <>
      <Head>
        {activeNavLink?.label && (
          <title>
            {activeNavLink?.label} - {process.env.NEXT_PUBLIC_TITLE}
          </title>
        )}
      </Head>

      <Stack spacing="md">
        <Container size={690} p={0} sx={{ width: "100%" }}>
          <Tabs value={params.sort} onTabChange={handleSortChange}>
            <Tabs.List>
              {sortVariants.map(({ value, label }) => (
                <Tabs.Tab value={value} key={value}>
                  {label}
                </Tabs.Tab>
              ))}
              <Menu openDelay={0}>
                <Menu.Target>
                  <Tabs.Tab
                    rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    value={
                      params.sort &&
                      sortOtherVariants
                        .map((item) => item.value)
                        .includes(params.sort)
                        ? params.sort
                        : "-1"
                    }
                  >
                    {params.sort &&
                      sortOtherVariants.find(
                        (item) => item.value === params.sort
                      )?.label}
                  </Tabs.Tab>
                </Menu.Target>

                <Menu.Dropdown>
                  {sortOtherVariants.map(({ label, value }) => (
                    <Menu.Item
                      key={value}
                      value={value}
                      onClick={handleMenuClick}
                    >
                      {label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </Tabs.List>
          </Tabs>
        </Container>

        {params.type === ListingType.All && params.sort === SortType.Hot && (
          <PostEdition />
        )}

        <Box sx={(theme) => ({ margin: -theme.spacing.md })}>
          <Box
            component={PullToRefresh}
            onRefresh={posts.refetch}
            refreshingContent={<RefreshContent />}
            pullingContent={<PullDownContent />}
          >
            <Box sx={(theme) => ({ margin: theme.spacing.md })}>
              <PostList posts={posts} key="home-feed" />
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

FeedPage.Navbar = AppNavbar;
FeedPage.Aside = AppAside;

export default FeedPage;
