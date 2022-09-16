import { Center, Grid, Loader } from "@mantine/core";
import { ForwardedRef, forwardRef } from "react";
import { CommunityMoreLoaderProps } from "./CommunityList";

const CommunityMoreLoader = (
  { isSuccess, isFetching }: CommunityMoreLoaderProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <Grid.Col ref={ref} span={12}>
      <Center>{isSuccess && isFetching && <Loader />}</Center>
    </Grid.Col>
  );
};

export const CommunityMoreLoaderWithRef = forwardRef<
  HTMLDivElement,
  CommunityMoreLoaderProps
>(CommunityMoreLoader);
