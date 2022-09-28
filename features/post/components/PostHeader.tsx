import { Group, ScrollArea, Container } from "@mantine/core";
import { FC } from "react";
import { UserButton } from "features/user/components/UserButton";
import { CommunityButton } from "features/community/components/CommunityButton";
import { Some } from "@sniptt/monads";
import { DateFormatted } from "baza/components/DeteFormatted";
import { PostMenu } from "./PostMenu";
import { CommunitySafe, PersonSafe, Post } from "ujournal-lemmy-js-client";

export const PostHeader: FC<{
  community: CommunitySafe;
  creator: PersonSafe;
  post: Post;
  saved: boolean;
}> = ({ community, creator, post, saved }) => {
  return (
    <ScrollArea sx={{ overflow: "visible !important" }} scrollbarSize={0}>
      <Container size={650} p={0}>
        <Group position="apart" mt="-xs" noWrap>
          <Group
            noWrap
            sx={{ flex: "1 1 0", flexGrow: "unset" }}
            spacing="xs"
            mx="-xs"
          >
            <CommunityButton
              communityName={community.name}
              image={community.icon.match<string | undefined>({
                some: (name) => name,
                none: undefined,
              })}
              label={Some(community.title).match<string>({
                some: (name) => name,
                none: () => community.name,
              })}
              weight={600}
            />
            <UserButton
              userId={creator.id}
              username={creator.name}
              image={creator.avatar.match<string | undefined>({
                some: (name) => name,
                none: undefined,
              })}
              label={creator.display_name.match<string>({
                some: (name) => name,
                none: () => creator.name,
              })}
              showAvatar={false}
            />
            <DateFormatted date={new Date(post.published + "Z")} />
          </Group>

          <PostMenu post={post} saved={saved} />
        </Group>
      </Container>
    </ScrollArea>
  );
};
