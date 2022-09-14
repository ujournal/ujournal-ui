import { Box } from "@mantine/core";
import { CommunityList } from "features/community/components/CommunityList";
import { LinksList } from "baza/components/LinksList";
import {
  IconMessageCircle,
  IconMessageCircle2,
  IconTrendingUp,
} from "@tabler/icons";
import { useCallback, useMemo } from "react";
import { IconFlame } from "@tabler/icons";
import { useTranslation } from "react-i18next";
import { capitalize } from "baza/utils/string";
import { IconBolt } from "@tabler/icons";
import { SortType } from "ujournal-lemmy-js-client";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  FetchPostsParams,
  fetchPostsParamsDefault,
} from "features/post/hooks/usePostList";
import { useMenuToggle } from "baza/hooks/useMenuToggle";

export const AppNavbar = () => {
  const { t } = useTranslation();
  const { toggle: toggleMenu } = useMenuToggle();

  const handleToggleMenu = useCallback(() => {
    toggleMenu(false);
  }, [toggleMenu]);

  const query = useRouterQuery<FetchPostsParams>(fetchPostsParamsDefault);

  const links = useMemo(
    () =>
      [
        {
          sort: SortType.Hot,
          url: { pathname: "/", query: { ...query, sort: SortType.Hot } },
          label: capitalize(t("hot")),
          icon: IconFlame,
        },
        {
          sort: SortType.Active,
          url: { pathname: "/", query: { ...query, sort: SortType.Active } },
          label: capitalize(t("active")),
          icon: IconTrendingUp,
        },
        {
          sort: SortType.New,
          url: { pathname: "/", query: { ...query, sort: SortType.New } },
          label: capitalize(t("new")),
          icon: IconBolt,
        },
        {
          sort: SortType.MostComments,
          url: {
            pathname: "/",
            query: { ...query, sort: SortType.MostComments },
          },
          label: capitalize(t("most_comments")),
          icon: IconMessageCircle,
        },
        {
          sort: SortType.NewComments,
          url: {
            pathname: "/",
            query: { ...query, sort: SortType.NewComments },
          },
          label: capitalize(t("new_comments")),
          icon: IconMessageCircle2,
        },
      ].map((link) => ({
        ...link,
        active: query.sort === link.sort,
      })),
    [query, t]
  );

  return (
    <>
      <Box mb="lg">
        <LinksList items={links} onLinkClick={handleToggleMenu} />
      </Box>

      <CommunityList
        activeCommunityName={query.communityName}
        buttonProps={{ onLinkClick: handleToggleMenu }}
      />
    </>
  );
};
