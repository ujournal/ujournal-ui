import { useCallback, useMemo } from "react";
import { useCommunityList } from "./useCommunityList";

export const useCommunityListForNavbar = ({
  activeCommunityName,
}: {
  activeCommunityName: string;
}) => {
  const communities = useCommunityList();

  const transformCommunities = useCallback(
    (data: ReturnType<typeof useCommunityList>["data"]) => {
      return data?.map((community) => {
        return {
          communityName: community.community.name,
          image: community.community.icon.match<string | undefined>({
            some: (icon) => icon,
            none: undefined,
          }),
          label: community.community.title,
          active: activeCommunityName === community.community.name,
        };
      });
    },
    [activeCommunityName]
  );

  const data = useMemo(
    () => transformCommunities(communities.data) || [],
    [communities.data, transformCommunities]
  );

  return {
    ...communities,
    data,
  };
};
