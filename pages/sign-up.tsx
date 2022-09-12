import { Container, Card } from "@mantine/core";
import { SignUpForm } from "features/auth/components/SignUpForm";
import { SitePage } from "types";

const SignUpPage: SitePage = () => {
  return (
    <Container size="xs">
      <Card p="lg" radius="md">
        <SignUpForm onSubmit={console.log} />
      </Card>
    </Container>
  );
};

export default SignUpPage;
