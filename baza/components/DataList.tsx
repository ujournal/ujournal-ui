import { Center, Loader } from "@mantine/core";
import { ReactElement } from "react";
import { ComponentType } from "react";
import { get } from "lodash";
import { FC } from "react";

const DataListLoader: FC = () => {
  return (
    <Center>
      <Loader />
    </Center>
  );
};

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
  loaderComponent: LoaderComponent = DataListLoader,
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
