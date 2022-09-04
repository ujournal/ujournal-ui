import { Container, Card } from "@mantine/core";
import { PostEditForm } from "features/post-edit/components/PostEditForm";
import { SitePage } from "types";

const CreatePostPage: SitePage = () => {
  return (
    <Container size="md">
      <Card p="md">
        <PostEditForm values={{}} onSubmit={console.log} />
      </Card>
    </Container>
  );
};

export default CreatePostPage;
