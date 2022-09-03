import { CommunityButton } from "features/community/components/CommunityButton";
import { FC } from "react";

export const PostFilter: FC = () => {
  return (
    <>
      <CommunityButton label={"Популярне"} />
      <CommunityButton label={"Активные"} />
      <CommunityButton label={"Новые"} />
      <CommunityButton label={"Наиболее комментируемые"} />
      <CommunityButton label={"Новые комментарии"} />
    </>
  );
};
