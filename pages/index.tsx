import { SitePage } from "types";
import { PostList } from "features/post/components/PostList";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { Box, Container, Select, Stack } from "@mantine/core";
import { RefreshContent } from "baza/components/PullToRefresh/RefreshContent";
import { PullDownContent } from "baza/components/PullToRefresh/PullDownContent";
import { PostEdition } from "features/post/components/PostEdition";
import { ListingType, SortType } from "ujournal-lemmy-js-client";
import { buildKeyFromParams } from "baza/utils/key";
import { useTranslation } from "react-i18next";
import { useBreakpoint } from "baza/hooks/useBreakpoint";

const FeedPage: SitePage = () => {
  const { t } = useTranslation();
  const params = useRouterQuery<FetchPostsParams>({
    ...fetchPostsParamsDefault,
  });
  const [sort, setSort] = useState(params.sort);
  const _params = { ...params, sort };
  const posts = usePostList({ params: _params });
  const navLinks = useNavLinks();
  const activeNavLink = useMemo(
    () => navLinks.find((item) => item.active),
    [navLinks]
  );

  const handleSortChange = useCallback((value: SortType) => {
    setSort(value);
  }, []);

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
          <Select
            placeholder={t("sort")}
            data={[
              { value: SortType.Active, label: t("active") },
              { value: SortType.Hot, label: t("hot") },
              { value: SortType.New, label: t("new") },
              // { value: SortType.Old, label: t("old") },
              { value: SortType.TopDay, label: t("top_day") },
              { value: SortType.TopWeek, label: t("top_week") },
              { value: SortType.TopMonth, label: t("top_month") },
              { value: SortType.TopYear, label: t("top_year") },
              { value: SortType.TopAll, label: t("top_all") },
              { value: SortType.MostComments, label: t("most_comments") },
              { value: SortType.NewComments, label: t("new_comments") },
            ]}
            value={_params.sort}
            sx={{ display: "flex" }}
            variant="unstyled"
            onChange={handleSortChange}
          />
        </Container>

        {params.type === ListingType.All && params.sort === SortType.New && (
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
