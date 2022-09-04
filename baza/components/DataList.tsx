import { Center, Loader } from "@mantine/core";
import { ReactElement } from "react";
import { ComponentType } from "react";
import { get } from "lodash";

type DataListComponentType = <TDataItem extends { [key: string]: any }>(props: {
  data: any;
  isLoading: boolean;
  transform?: (data: any) => TDataItem[] | undefined;
  itemComponent: ComponentType<TDataItem>;
  loaderComponent?: ComponentType;
  itemKey?: string;
  itemProps?: any;
}) => ReactElement;

export const DataList: DataListComponentType = ({
  data,
  isLoading,
  itemComponent: Item,
  itemKey = "id",
  transform = (data) => data,
  itemProps = {},
  loaderComponent: LoaderComponent = Loader,
}) => {
  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <>
      {transform(data)?.map((item: any) => (
        <Item {...item} {...itemProps} key={get(item, itemKey)} />
      ))}
    </>
  );
};
