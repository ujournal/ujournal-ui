import EditorJS from "@editorjs/editorjs";
import { Box, BoxProps, Skeleton } from "@mantine/core";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

type TextEditorProps = {
  placeholder?: string;
} & BoxProps;

export const TextEditor: FC<TextEditorProps> = ({
  placeholder,
  ...boxProps
}) => {
  const editorElementRef = useRef<HTMLDivElement>(null);
  const editorElement = editorElementRef.current;
  const [editor, setEditor] = useState<EditorJS | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleEditorReady = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (editorElement) {
      const editor = new EditorJS({
        holder: editorElement,
        placeholder,
        onReady: handleEditorReady,
      });

      setEditor(editor);

      return () => {
        if (editor) {
          editor.destroy();
        }
      };
    }
  }, [editorElement, handleEditorReady, placeholder]);

  return (
    <Box
      {...boxProps}
      ref={editorElementRef}
      sx={(theme) => ({
        "& .codex-editor__redactor": {
          paddingBottom: `0 !important`,
          paddingLeft: 8,
          paddingRight: 8,
          marginLeft: -8,
          marginRight: -8,
          borderRadius: theme.radius.sm,
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.015)",
          },
        },
        "& .ce-paragraph[data-placeholder]:empty::before": {
          color: "#adb5bd",
        },
        "& .codex-editor__loader": {
          height: "auto",
          display: "none",
        },
      })}
    >
      {!isLoaded && <Skeleton height={40} />}
    </Box>
  );
};
