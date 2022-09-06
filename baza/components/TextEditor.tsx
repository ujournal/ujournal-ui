import EditorJS, { API as EditorAPI } from "@editorjs/editorjs";
import { Box, BoxProps } from "@mantine/core";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import HeaderTool from "@editorjs/header";
import ImageTool from "@editorjs/image";
import CodeTool from "@editorjs/code";
import { convertMarkdownToEditorJs } from "baza/utils/markdown/convertMarkdownToEditorjs";
import { convertEditorJsToMarkdown } from "baza/utils/markdown/convertEditorJsToMarkdown";

type TextEditorProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
} & BoxProps;

export const TextEditor: FC<TextEditorProps> = ({
  placeholder,
  value = "",
  onChange,
  ...boxProps
}) => {
  const editorElementRef = useRef<HTMLDivElement>(null);
  const editorElement = editorElementRef.current;
  const [editor, setEditor] = useState<EditorJS | undefined>(undefined);

  const handleEditorChange = useCallback(
    async (editorApi: EditorAPI) => {
      onChange(convertEditorJsToMarkdown(await editorApi.saver.save()));
    },
    [onChange]
  );

  useEffect(() => {
    if (editorElement) {
      console.log(convertMarkdownToEditorJs(value));

      const editor = new EditorJS({
        holder: editorElement,
        placeholder,
        tools: {
          code: CodeTool,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "/uploadFile",
                byUrl: "/fetchUrl",
              },
            },
          },
          header: {
            class: HeaderTool as any,
            config: {
              levels: [2, 3],
              defaultLevel: 3,
            },
          },
        },
        data: convertMarkdownToEditorJs(value),
        onChange: handleEditorChange,
      });

      setEditor(editor);

      return () => {
        if (editor) {
          editor?.destroy();
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorElement, placeholder]);

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
          height: 60,
        },
        "& .ce-toolbar__actions": {
          backgroundColor: "#fff",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.md,
        },
      })}
    />
  );
};
