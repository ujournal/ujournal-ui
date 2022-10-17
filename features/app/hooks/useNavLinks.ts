import { IconSpeakerphone, IconCircleCheck, IconNews } from "@tabler/icons";
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
            query: {
              ...query,
              type: ListingType.All,
              sort: SortType.Hot,
            },
          },
          label: capitalize(t("hot")),
          icon: IconNews,
        },
        {
          type: ListingType.All,
          sort: SortType.Active,
          parent: capitalize(t("hot")),
          url: {
            pathname: "/",
            query: {
              ...query,
              type: ListingType.All,
              sort: SortType.Active,
            },
          },
          label: capitalize(t("active")),
          icon: IconNews,
        },
        {
          type: ListingType.All,
          sort: SortType.New,
          parent: capitalize(t("hot")),
          url: {
            pathname: "/",
            query: {
              ...query,
              type: ListingType.All,
              sort: SortType.New,
            },
          },
          label: capitalize(t("new")),
          icon: IconNews,
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
          icon: IconCircleCheck,
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
              query.type === link.type &&
              query.sort === link.sort) ||
            (router.pathname !== "/" && router.pathname === link.url.pathname),
        };
      }),
    [query, router.pathname]
  );
};
