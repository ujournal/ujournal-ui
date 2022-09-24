import { ActionIcon, Box, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBackspace } from "@tabler/icons";
import { FC, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

export type Values = {
  query: string;
};

const valuesDefault = { query: "" };

export const CommunitySearchForm: FC<{
  values?: Values;
  onSubmit: (values: Values) => void;
}> = ({ values = valuesDefault, onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();
  const form = useForm({ initialValues: values });

  const handleClear = useCallback(() => {
    form.reset();
    onSubmit(valuesDefault);
  }, [form, onSubmit]);

  return (
    <Box
      ref={formRef}
      component="form"
      onSubmit={form.onSubmit(onSubmit)}
      onChange={form.onSubmit(onSubmit)}
    >
      <Group noWrap>
        <Box sx={{ flex: "1 1 0" }}>
          <TextInput
            placeholder={t("search")}
            size="lg"
            radius="md"
            {...form.getInputProps("query")}
            rightSection={
              form.values.query && (
                <ActionIcon mr="md" onClick={handleClear}>
                  <IconBackspace stroke={1.5} />
                </ActionIcon>
              )
            }
          />
        </Box>
      </Group>
    </Box>
  );
};
