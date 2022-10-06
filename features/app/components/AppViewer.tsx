import { Box, Modal, ScrollArea } from "@mantine/core";
import { FC, useCallback, useEffect, useState } from "react";

export const AppViewer: FC = () => {
  const [image, setImage] = useState<string | undefined>();

  useEffect(() => {
    window.document.body.addEventListener("click", (event: Event) => {
      if (
        event.target instanceof HTMLElement &&
        event.target?.closest(".zoomable")
      ) {
        const target =
          event.target instanceof HTMLImageElement
            ? event.target
            : event.target.querySelector("img");
        setImage(target?.src);
      }
    });
  }, []);

  const handleClose = useCallback(() => {
    setImage(undefined);
  }, []);

  return (
    <Modal
      withCloseButton={false}
      opened={Boolean(image)}
      onClose={handleClose}
      centered
      styles={{
        modal: {
          padding: 0,
          backgroundColor: "transparent",
          width: "auto",
        },
      }}
    >
      <ScrollArea sx={{ maxWidth: "100vw" }}>
        <Box component="img" src={image} alt="" onClick={handleClose} />
      </ScrollArea>
    </Modal>
  );
};
