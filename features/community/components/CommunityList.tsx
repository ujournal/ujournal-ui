import { CommunityButton } from "features/community/components/CommunityButton";
import { FC, useCallback } from "react";
import { useCommunities } from "../hooks/useCommunities";
import { DataList } from "components/DataList";

export const CommunityList: FC = () => {
  const communities = useCommunities();

  const transformCommunities = useCallback(
    (data: ReturnType<typeof useCommunities>["data"]) => {
      return data?.communities.map((community) => {
        return {
          id: community.community.id,
          image: community.community.icon.match<string | undefined>({
            some: (icon) => icon,
            none: undefined,
          }),
          label: community.community.title,
        };
      });
    },
    []
  );

  return (
    <DataList
      {...communities}
      component={CommunityButton}
      transform={transformCommunities}
    />
  );
};
