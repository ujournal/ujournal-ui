import { Box, Stack, Text } from "@mantine/core";
import { CommunityList } from "features/community/components/CommunityList";
import { LinksList } from "baza/components/LinksList";
import {
  IconChecks,
  IconMessageCircle,
  IconMessageCircle2,
  IconSpeakerphone,
  IconSunset2,
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
import { useRouter } from "next/router";
import { differenceWith, map, omit } from "lodash";
import { NavbarTitle } from "baza/components/NavbarTitle";

export const AppNavbar = () => {
  const { t } = useTranslation();
  const { toggle: toggleMenu } = useMenuToggle();
  const router = useRouter();

  const handleToggleMenu = useCallback(() => {
    toggleMenu(false);
  }, [toggleMenu]);

  const query = useRouterQuery<FetchPostsParams>(fetchPostsParamsDefault);

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
          sort: SortType.TopDay,
          url: {
            pathname: "/",
            query: { ...query, type: ListingType.All, sort: SortType.TopDay },
          },
          label: capitalize(t("top_day")),
          icon: IconSunset2,
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
      ].map((link) => {
        return {
          ...link,
          active:
            (router.pathname === "/" &&
              query.sort === link.sort &&
              query.type === link.type) ||
            (router.pathname !== "/" && router.pathname === link.url.pathname),
        };
      }),
    [query, router.pathname, t]
  );

  const commnitySubscribedList = useCommunityListForNavbar({
    type: ListingType.Subscribed,
    sort: SortType.TopAll,
    activeCommunityName: query.communityName as string,
    limit: 10,
  });

  const commnityTopList = useCommunityListForNavbar({
    type: ListingType.Community,
    sort: SortType.TopAll,
    activeCommunityName: query.communityName as string,
    limit: 10,
  });

  const topList = useMemo(() => {
    if (commnityTopList.isLoading) {
      return commnityTopList;
    }

    const communityNamesSubscribed = map(
      commnitySubscribedList.data,
      "communityName"
    );

    return {
      ...commnityTopList,
      data: differenceWith(
        commnityTopList.data,
        communityNamesSubscribed,
        ({ communityName }, _communityName) => _communityName === communityName
      ),
    };
  }, [commnitySubscribedList.data, commnityTopList]);

  return (
    <Stack>
      <Box>
        <LinksList items={links} onLinkClick={handleToggleMenu} />
      </Box>

      {commnitySubscribedList.isSuccess && commnityTopList.data.length > 0 && (
        <Box>
          <NavbarTitle>{t("subscribed")}</NavbarTitle>

          <CommunityList
            {...omit(commnitySubscribedList, ["fetchNextPage"])}
            itemProps={{ onLinkClick: handleToggleMenu }}
          />
        </Box>
      )}

      {topList.isLoading ||
        (topList.data.length > 0 && (
          <Box>
            <NavbarTitle>{t("top")}</NavbarTitle>

            <CommunityList
              {...omit(topList, ["fetchNextPage"])}
              itemProps={{ onLinkClick: handleToggleMenu }}
            />
          </Box>
        ))}
    </Stack>
  );
};
