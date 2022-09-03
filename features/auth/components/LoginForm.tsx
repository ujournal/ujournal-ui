import { FC } from "react";
import { useForm } from "@mantine/form";
import { Button, Group, Stack, TextInput } from "@mantine/core";

type Values = {
  usernameOrEmail: string;
  password: string;
};

export const LoginForm: FC<{
  values?: Values;
  onSubmit: (values: Values) => void;
}> = ({
  values = {
    usernameOrEmail: "",
    password: "",
  },
  onSubmit,
}) => {
  const form = useForm({
    initialValues: values,
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing="sm">
        <TextInput
          withAsterisk
          label="Username or Email"
          {...form.getInputProps("usernameOrEmail")}
        />

        <TextInput
          withAsterisk
          label="Password"
          {...form.getInputProps("password")}
        />

        <Group position="center" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </Stack>
    </form>
  );
};
