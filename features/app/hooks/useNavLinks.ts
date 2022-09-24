import {
  IconFlame,
  IconTrendingUp,
  IconBolt,
  IconSunset2,
  IconMessageCircle,
  IconMessageCircle2,
  IconChecks,
  IconSpeakerphone,
} from "@tabler/icons";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  FetchPostsParams,
  fetchPostsParamsDefault,
} from "features/post/hooks/usePostList";
import { t } from "i18next";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ListingType, SortType } from "ujournal-lemmy-js-client";

export const useNavLinks = () => {
  const router = useRouter();
  const query = useRouterQuery<FetchPostsParams>(fetchPostsParamsDefault);

  return useMemo(
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
          parent: capitalize(t("new")),
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
          parent: capitalize(t("new")),
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
          parent: capitalize(t("new")),
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
    [query, router.pathname]
  );
};
