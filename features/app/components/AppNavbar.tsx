import { Box } from "@mantine/core";
import { CommunityList } from "features/community/components/CommunityList";
import { LinksList } from "baza/components/LinksList";
import {
  IconChecks,
  IconMessageCircle,
  IconMessageCircle2,
  IconSpeakerphone,
  IconTrendingUp,
} from "@tabler/icons";
import { useCallback, useMemo } from "react";
import { IconFlame } from "@tabler/icons";
import { useTranslation } from "react-i18next";
import { capitalize } from "baza/utils/string";
import { IconBolt } from "@tabler/icons";
import { ListingType, SortType } from "ujournal-lemmy-js-client";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  FetchPostsParams,
  fetchPostsParamsDefault,
} from "features/post/hooks/usePostList";
import { useMenuToggle } from "baza/hooks/useMenuToggle";
import { useCommunityListForNavbar } from "features/community/hooks/useCommunityListForNavbar";

export const AppNavbar = () => {
  const { t } = useTranslation();
  const { toggle: toggleMenu } = useMenuToggle();

  const handleToggleMenu = useCallback(() => {
    toggleMenu(false);
  }, [toggleMenu]);

  const query = useRouterQuery<FetchPostsParams>(fetchPostsParamsDefault);

  const commnityList = useCommunityListForNavbar({
    activeCommunityName: query.communityName as string,
  });

  const links = useMemo(
    () =>
      [
        {
          type: ListingType.All,
          sort: SortType.Hot,
          url: {
            pathname: "/",
            query: { ...query, type: ListingType.All, sort: SortType.Hot },
          },
          label: capitalize(t("hot")),
          icon: IconFlame,
        },
        {
          type: ListingType.All,
          sort: SortType.Active,
          url: {
            pathname: "/",
            query: { ...query, type: ListingType.All, sort: SortType.Active },
          },
          label: capitalize(t("active")),
          icon: IconTrendingUp,
        },
        {
          type: ListingType.All,
          sort: SortType.New,
          url: {
            pathname: "/",
            query: { ...query, type: ListingType.All, sort: SortType.New },
          },
          label: capitalize(t("new")),
          icon: IconBolt,
        },
        {
          type: ListingType.All,
          sort: SortType.MostComments,
          url: {
            pathname: "/",
            query: {
              ...query,
              type: ListingType.All,
              sort: SortType.MostComments,
            },
          },
          label: capitalize(t("most_comments")),
          icon: IconMessageCircle,
        },
        {
          type: ListingType.All,
          sort: SortType.NewComments,
          url: {
            pathname: "/",
            query: {
              ...query,
              type: ListingType.All,
              sort: SortType.NewComments,
            },
          },
          label: capitalize(t("new_comments")),
          icon: IconMessageCircle2,
        },
        {
          type: ListingType.Subscribed,
          sort: SortType.Hot,
          url: {
            pathname: "/",
            query: {
              ...query,
              type: ListingType.Subscribed,
              sort: SortType.Hot,
            },
          },
          label: capitalize(t("subscribed")),
          icon: IconChecks,
        },
        {
          type: null,
          sort: null,
          url: {
            pathname: "/communities",
          },
          label: capitalize(t("communities")),
          icon: IconSpeakerphone,
        },
      ].map((link) => ({
        ...link,
        active: query.sort === link.sort && query.type === link.type,
      })),
    [query, t]
  );

  return (
    <>
      <Box mb="lg">
        <LinksList items={links} onLinkClick={handleToggleMenu} />
      </Box>

      <CommunityList
        {...commnityList}
        itemProps={{ onLinkClick: handleToggleMenu }}
      />
    </>
  );
};
