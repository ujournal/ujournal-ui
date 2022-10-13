import { Box, List, ThemeIcon } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import Link from "next/link";
import { FC } from "react";

export const AppCreatePostAside: FC = () => {
  return (
    <List
      spacing="xs"
      size="sm"
      p="sm"
      center
      icon={
        <ThemeIcon color="gray" size={24} radius="xl">
          <IconAlertCircle size={16} />
        </ThemeIcon>
      }
    >
      <List.Item>Жодної порнографії</List.Item>
      <List.Item>Без насильства чи кривавого вмісту</List.Item>
      <List.Item>Жодної мови ворожнечі та залякування</List.Item>
      <List.Item>Без спаму та маніпуляцій</List.Item>
      <List.Item>
        Жодного оманливого вмісту (виключення{" "}
        <Link
          href={{
            pathname: "/community",
            query: { communityName: "panorama" },
          }}
          passHref
        >
          <Box component="a">Панорама</Box>
        </Link>
        )
      </List.Item>
      <List.Item>Жодної незаконної діяльності згідно законів України</List.Item>
      <List.Item>Без привласнювання «особистості» іншого користувача</List.Item>
      <List.Item>Без порушення авторських прав</List.Item>
    </List>
  );
};
