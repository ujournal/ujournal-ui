import EditorJS from "@editorjs/editorjs";
import { Box, BoxProps } from "@mantine/core";
import { FC, useEffect, useMemo, useRef } from "react";

type TextEditorProps = {
  placeholder?: string;
} & BoxProps;

export const TextEditor: FC<TextEditorProps> = ({
  placeholder,
  ...boxProps
}) => {
  const editorElementRef = useRef<HTMLDivElement>(null);
  const editorElement = editorElementRef.current;
  const editorRef = useRef<EditorJS>(null);
  const editor = editorRef.current;

  useEffect(() => {
    if (!editor && editorElement) {
      new EditorJS({
        holder: editorElement,
        placeholder,
      });
    }

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor, editorElement, placeholder]);

  return (
    <Box
      {...boxProps}
      ref={editorElementRef}
      component="div"
      sx={{
        "& .codex-editor__redactor": {
          paddingBottom: `0 !important`,
          paddingLeft: 8,
          paddingRight: 8,
          marginLeft: -8,
          marginRight: -8,
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.015)",
          },
        },
        "& .ce-paragraph[data-placeholder]:empty::before": {
          color: "#adb5bd",
        },
      }}
    />
  );
};
