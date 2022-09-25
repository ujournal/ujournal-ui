import { Container, Card } from "@mantine/core";
import { redirectOnSignedOut } from "features/app/components/AppAuthRedirect";
import { CommunityForm } from "features/community/forms/CommunityForm";
import { SitePage } from "types";

const CreateCommunityPage: SitePage = () => {
  return (
    <Container size={690} p={0}>
      <Card p="lg" sx={{ overflow: "visible" }} radius="md">
        <CommunityForm onSubmit={() => {}} />
      </Card>
    </Container>
  );
};

CreateCommunityPage.authRedirect = redirectOnSignedOut;

export default CreateCommunityPage;
