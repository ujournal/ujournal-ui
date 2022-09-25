import EditorJS, { API as EditorAPI } from "@editorjs/editorjs";
import { Box, BoxProps } from "@mantine/core";
import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import HeaderTool from "@editorjs/header";
import ImageTool from "@editorjs/image";
import CodeTool from "@editorjs/code";
import QuoteTool from "@editorjs/quote";
import ListTool from "@editorjs/list";
import { YouTubeTool } from "./YouTubeTool";
import Undo from "editorjs-undo";
import { convertMarkdownToEditorJs } from "baza/utils/markdown/convertMarkdownToEditorJsBlocks";
import { convertEditorJsToMarkdown } from "baza/utils/markdown/convertEditorJsBlocksToMarkdown";
import { useImageUploaderFather } from "baza/hooks/useImageUploaderFather";

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
  const uploadImage = useImageUploaderFather();

  const handleEditorChange = useCallback(
    async (editorApi: EditorAPI) => {
      onChange(convertEditorJsToMarkdown(await editorApi.saver.save()));
    },
    [onChange]
  );

  const uploadByFile = useCallback(
    async (file: File) => {
      const result = await uploadImage({ file });

      if (result) {
        return {
          success: 1,
          file: {
            url: result.fileUrl,
          },
        };
      }
    },
    [uploadImage]
  );

  const uploadByUrl = useCallback(async (url: string) => {
    return Promise.resolve({
      success: 1,
      file: {
        url,
      },
    });
  }, []);

  const _editor = useMemo(() => {
    const element = window.document.createElement("div");

    const handleEditorReady = () => {
      new Undo({ editor });
    };

    const editor = new EditorJS({
      holder: element,
      placeholder,
      tools: {
        code: CodeTool,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile,
              uploadByUrl,
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
        quote: {
          class: QuoteTool,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
        },
        list: {
          class: ListTool,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        youtubeEmbed: YouTubeTool,
      },
      data: convertMarkdownToEditorJs(value),
      onChange: handleEditorChange,
      onReady: handleEditorReady,
    });

    return { element, editor };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editorElementRef.current) {
      const { current } = editorElementRef;

      current?.appendChild(_editor.element);

      return () => {
        current?.removeChild(_editor.element);
      };
    }
  }, [_editor]);

  return (
    <Box
      {...boxProps}
      ref={editorElementRef}
      key="editor"
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
          backgroundColor: theme.colors.gray[1],
          padding: 4,
          borderRadius: theme.radius.md,
        },
        "& .cdx-quote__text": {
          marginBottom: 0,
        },
        "& .cdx-quote__caption": {
          display: "none",
        },
      })}
    />
  );
};
