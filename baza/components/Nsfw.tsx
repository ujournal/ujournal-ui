import { Box, Button } from "@mantine/core";
import { FC, ReactNode, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export const Nsfw: FC<{
  children: ReactNode;
  enabled?: boolean;
}> = ({ children, enabled = false }) => {
  const { t } = useTranslation();
  const [_enabled, setEnabled] = useState(enabled);

  const handleToggleShowed = useCallback(() => {
    setEnabled((enabled) => !enabled);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={_enabled ? { filter: "blur(20px)", overflow: "hidden" } : undefined}
      >
        {children}
      </Box>
      {_enabled && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "80vh",
          }}
        >
          <Button
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: 210,
              margin: "auto",
            }}
            onClick={handleToggleShowed}
            variant="gradient"
            radius="md"
          >
            {t("show_nsfw")}
          </Button>
        </Box>
      )}
    </Box>
  );
};
