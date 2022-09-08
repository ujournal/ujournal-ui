import { useQuery } from "@tanstack/react-query";
import isUrl from "is-url";
import { GetSiteMetadata } from "ujournal-lemmy-js-client";
import { useLemmyClient } from "./useLemmyClient";

export const useUrlMetadata = (url: string) => {
  const lemmyClient = useLemmyClient();

  return useQuery(["urlMetadata", url], async () => {
    if (isUrl(url)) {
      return await lemmyClient.getSiteMetadata(
        new GetSiteMetadata({
          url,
        })
      );
    }

    return undefined;
  });
};

export type UrlMetadata = ReturnType<typeof useUrlMetadata>;
