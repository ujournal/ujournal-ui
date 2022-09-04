import { Center, Loader } from "@mantine/core";
import { ReactElement } from "react";
import { ComponentType } from "react";
import { get } from "lodash";

type DataListComponentType = <TDataItem extends { [key: string]: any }>(props: {
  data: any;
  component: ComponentType<TDataItem>;
  isLoading: boolean;
  transform?: (data: any) => TDataItem[] | undefined;
  itemKey?: string;
}) => ReactElement;

export const DataList: DataListComponentType = ({
  data,
  isLoading,
  component: Item,
  itemKey = "id",
  transform = (data) => data,
}) => {
  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      {transform(data)?.map((item: any) => (
        <Item {...item} key={get(item, itemKey)} />
      ))}
    </>
  );
};
