import { Container, Card } from "@mantine/core";
import { PostEditForm } from "features/post-edit/components/PostEditForm";
import { SitePage } from "types";

const CreatePostPage: SitePage = () => {
  return (
    <Container size={690} p={0}>
      <Card p="md">
        <PostEditForm onSubmit={console.log} />
      </Card>
    </Container>
  );
};

export default CreatePostPage;
