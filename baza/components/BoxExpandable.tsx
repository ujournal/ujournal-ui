import { Box, BoxProps, Button, ButtonProps } from "@mantine/core";
import { IconCaretDown, IconCaretUp } from "@tabler/icons";
import { useBreakpoint } from "baza/hooks/useBreakpoint";
import { FC, useCallback, useState } from "react";

export const BoxExpandable: FC<
  BoxProps & { showBody?: boolean; buttonProps?: ButtonProps }
> = ({ showBody = false, children, buttonProps, ...props }) => {
  const largerThanMd = useBreakpoint({ largerThan: "md" });
  const [_showBody, setShowBody] = useState<boolean>(showBody);

  const handleToggleShowBody = useCallback(() => {
    setShowBody((_showBody) => !_showBody);
  }, []);

  return (
    <>
      <Box
        mt={largerThanMd ? "lg" : "sm"}
        mx="-lg"
        px="lg"
        {...props}
        sx={{
          position: "relative",
          maxHeight: _showBody ? undefined : "100px",
          overflow: _showBody ? undefined : "hidden",
          "&:after": _showBody
            ? undefined
            : {
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                height: "100%",
                content: "''",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                pointerEvents: "none",
              },
        }}
      >
        {children}
      </Box>
      {!showBody && (
        <Button
          variant="light"
          radius="md"
          fullWidth
          mt="md"
          size="xs"
          sx={(theme) => ({
            backgroundColor: theme.fn.rgba(theme.colors.blue[0], 0.5),
          })}
          {...buttonProps}
          onClick={handleToggleShowBody}
        >
          {_showBody ? (
            <IconCaretUp stroke={1.5} />
          ) : (
            <IconCaretDown stroke={1.5} />
          )}
        </Button>
      )}
    </>
  );
};
