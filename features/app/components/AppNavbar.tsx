import { Box, Stack } from "@mantine/core";
import { CommunityList } from "features/community/components/CommunityList";
import { LinksList } from "baza/components/LinksList";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ListingType, SortType } from "ujournal-lemmy-js-client";
import { useRouterQuery } from "baza/hooks/useRouterQuery";
import {
  FetchPostsParams,
  fetchPostsParamsDefault,
} from "features/post/hooks/usePostList";
import { useMenuToggle } from "baza/hooks/useMenuToggle";
import { useCommunityListForNavbar } from "features/community/hooks/useCommunityListForNavbar";
import { differenceWith, map, omit } from "lodash";
import { NavbarTitle } from "baza/components/NavbarTitle";
import { useNavLinks } from "../hooks/useNavLinks";

export const AppNavbar = () => {
  const { t } = useTranslation();
  const { toggle: toggleMenu } = useMenuToggle();

  const handleMenuClose = useCallback(() => {
    toggleMenu(false);
  }, [toggleMenu]);

  const query = useRouterQuery<FetchPostsParams>(fetchPostsParamsDefault);

  const links = useNavLinks();

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

  const communityActiveList = useCommunityListForNavbar({
    type: ListingType.Community,
    sort: SortType.Active,
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
        <LinksList items={links} onLinkClick={handleMenuClose} />
      </Box>

      {commnitySubscribedList.isSuccess &&
        commnitySubscribedList.data.length > 0 && (
          <Box>
            <NavbarTitle>{t("subscribed")}</NavbarTitle>

            <CommunityList
              {...omit(commnitySubscribedList, ["fetchNextPage"])}
              itemProps={{ onLinkClick: handleMenuClose }}
            />
          </Box>
        )}

      {(topList.isLoading || topList.data.length > 0) && (
        <Box>
          <NavbarTitle>{t("top")}</NavbarTitle>

          <CommunityList
            {...omit(topList, ["fetchNextPage"])}
            itemProps={{ onLinkClick: handleMenuClose }}
          />
        </Box>
      )}

      {communityActiveList.data.length > 0 && (
        <Box>
          <NavbarTitle>{t("active")}</NavbarTitle>

          <CommunityList
            {...omit(communityActiveList, ["fetchNextPage"])}
            itemProps={{ onLinkClick: handleMenuClose }}
          />
        </Box>
      )}
    </Stack>
  );
};
