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
  listLoaderComponent?: ComponentType;
}> = ({
  data,
  isLoading = false,
  itemProps,
  itemKey = "communityName",
  itemComponent: ItemComponent = CommunityButton,
  isFetching,
  isSuccess,
  fetchNextPage = undefined,
  loaderComponent: Loader = CommunityMoreLoaderWithRef,
  listLoaderComponent: ListLoader = CommunityListLoader,
}) => {
  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: true,
    onLoadMore: fetchNextPage || (() => undefined),
    rootMargin: "0px 0px 400px 0px",
    disabled: false,
  });

  return (
    <>
      <DataList
        data={data}
        isLoading={isLoading}
        itemComponent={ItemComponent}
        loaderComponent={ListLoader}
        itemKey={itemKey}
        itemProps={itemProps}
      />
      {fetchNextPage && (
        <Loader ref={sentryRef} isFetching={isFetching} isSuccess={isSuccess} />
      )}
    </>
  );
};
