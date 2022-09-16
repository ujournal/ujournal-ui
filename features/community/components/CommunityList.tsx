import { CommunityButton } from "features/community/components/CommunityButton";
import React, { ComponentType, FC, ForwardedRef, forwardRef } from "react";
import { DataList } from "baza/components/DataList";
import { CommunityListLoader } from "./CommunityListLoader";
import { Center, Loader } from "@mantine/core";
import useInfiniteScroll from "react-infinite-scroll-hook";

export type CommunityMoreLoaderProps = {
  isSuccess?: boolean;
  isFetching?: boolean;
};

const CommunityMoreLoader = (
  { isSuccess, isFetching }: CommunityMoreLoaderProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <Center ref={ref} sx={{ height: 60 }}>
      {isSuccess && isFetching && <Loader />}
    </Center>
  );
};

const CommunityMoreLoaderWithRef = forwardRef<
  HTMLDivElement,
  CommunityMoreLoaderProps
>(CommunityMoreLoader);

export const CommunityList: FC<{
  data: any[];
  activeCommunityName?: string;
  itemProps?: any;
  itemComponent?: FC<any>;
  isLoading?: boolean;
  itemKey?: string;
  isSuccess?: boolean;
  isFetching?: boolean;
  fetchNextPage?: () => void;
  loaderComponent?: ComponentType;
}> = ({
  data,
  isLoading = false,
  itemProps,
  itemKey = "communityName",
  itemComponent: ItemComponent = CommunityButton,
  isFetching,
  isSuccess,
  fetchNextPage = () => {},
  loaderComponent: Loader = CommunityMoreLoaderWithRef,
}) => {
  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: true,
    onLoadMore: fetchNextPage,
    rootMargin: "0px 0px 400px 0px",
    disabled: false,
  });

  return (
    <>
      <DataList
        data={data}
        isLoading={isLoading}
        itemComponent={ItemComponent}
        loaderComponent={CommunityListLoader}
        itemKey={itemKey}
        itemProps={itemProps}
      />
      <Loader ref={sentryRef} isFetching={isFetching} isSuccess={isSuccess} />
    </>
  );
};
