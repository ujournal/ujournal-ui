import { Card, CardProps, Container } from "@mantine/core";
import { FC, ReactNode } from "react";

export const LegalCard: FC<{ children: ReactNode } & CardProps> = ({
  children,
  ...props
}) => {
  return (
    <Container size={800} {...props} p={0}>
      <Card p="md" radius="md">
        {children}
      </Card>
    </Container>
  );
};
