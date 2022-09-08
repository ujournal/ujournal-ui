import { Container, Card } from "@mantine/core";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { PostEditForm } from "features/post/components/PostEditForm";
import { SitePage } from "types";

const CreatePostPage: SitePage = () => {
  const largerThanSm = useBreakpoint({ largerThan: "sm" });

  return (
    <Container size={690} p={0}>
      <Card
        p={largerThanSm ? "xl" : "sm"}
        sx={{ overflow: "visible" }}
        radius="md"
      >
        <PostEditForm
          values={{
            community_id: -1,
            body: "",
            name: "",
            url: "",
            nsfw: false,
          }}
          onSubmit={console.log}
        />
      </Card>
    </Container>
  );
};

export default CreatePostPage;
