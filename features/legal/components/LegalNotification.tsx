import { FC, useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { Box } from "@mantine/core";

export const LegalNotification: FC = () => {
  useEffect(() => {
    if (!localStorage.legalVisited) {
      showNotification({
        id: "legal",
        title: "Підтвердження правил користування вебсайтом",
        message: (
          <>
            Фактичне користування вебсайтом означає прийняття вами{" "}
            <Link href={{ pathname: "/legal" }} passHref>
              <Box component="a" sx={{ textDecoration: "underline" }}>
                правил користування вебсайтом
              </Box>
            </Link>
          </>
        ),
        disallowClose: true,
        autoClose: false,
      });
    }
  }, []);

  return <></>;
};
