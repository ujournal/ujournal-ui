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
import { ListingType } from "ujournal-lemmy-js-client";

export const useNavLinks = () => {
  const router = useRouter();
  const query = useRouterQuery<FetchPostsParams>(fetchPostsParamsDefault);

  return useMemo(
    () =>
      [
        {
          type: ListingType.All,
          url: {
            pathname: "/",
            query: {
              ...query,
              type: ListingType.All,
            },
          },
          label: capitalize(t("all")),
          icon: IconNews,
        },
        {
          type: ListingType.Subscribed,
          url: {
            pathname: "/",
            query: {
              ...query,
              type: ListingType.Subscribed,
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
            (router.pathname === "/" && query.type === link.type) ||
            (router.pathname !== "/" && router.pathname === link.url.pathname),
        };
      }),
    [query, router.pathname]
  );
};
