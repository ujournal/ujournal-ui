import { Group } from "@mantine/core";
import { FC } from "react";
import {PersonSafe, Post } from "ujournal-lemmy-js-client";
import {userPersonViewSafe} from "../../user/hooks/userPersonViewSafe";
import {UserButton} from "../../user/components/UserButton";

export const PostCreator: FC<{
  post: Post;
}> = ({post}) => {
  let personViewSafe = userPersonViewSafe({
    creatorId: post.creator_id
  })
  let creator = personViewSafe.data?.person ?? new PersonSafe();

  return (
      <Group>
        <UserButton
            userId={creator.id}
            image={creator.avatar?.match<string | undefined>({
              some: (name) => name,
              none: undefined,
            })}
            label={creator.display_name?.match<string>({
              some: (name) => name,
              none: () => creator.name,
            })}
        />
        <span>рейтинг: {personViewSafe?.data?.totalScore}</span>
      </Group>
  );
};
