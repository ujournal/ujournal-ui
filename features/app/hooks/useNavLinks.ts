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
          sort: SortType.New,
          url: {
            pathname: "/",
            query: {
              ...query,
              type: ListingType.All,
              sort: SortType.New,
            },
          },
          label: capitalize(t("all")),
          icon: IconNews,
        },
        {
          type: ListingType.Subscribed,
          sort: SortType.New,
          url: {
            pathname: "/",
            query: {
              ...query,
              type: ListingType.Subscribed,
              sort: SortType.New,
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
              query.sort === link.sort &&
              query.type === link.type) ||
            (router.pathname !== "/" && router.pathname === link.url.pathname),
        };
      }),
    [query, router.pathname]
  );
};
