import { FC, useCallback, useEffect } from "react";
import { hideNotification, showNotification } from "@mantine/notifications";
import Link from "next/link";
import { Box, Button, Group } from "@mantine/core";

export const LegalNotification: FC = () => {
  const handleAccept = useCallback(() => {
    hideNotification("legal");
    localStorage.legalVisited = "yes";
  }, []);

  useEffect(() => {
    if (!localStorage.legalVisited) {
      showNotification({
        id: "legal",
        message: (
          <Group noWrap align="center">
            <Box>
              Фактичне користування вебсайтом означає прийняття вами{" "}
              <Link href={{ pathname: "/legal" }} passHref>
                <Box component="a" sx={{ textDecoration: "underline" }}>
                  правил користування вебсайтом
                </Box>
              </Link>
            </Box>
            <Button onClick={handleAccept}>Приймаю</Button>
          </Group>
        ),
        disallowClose: true,
        autoClose: false,
      });
    }
  }, [handleAccept]);

  return <></>;
};
