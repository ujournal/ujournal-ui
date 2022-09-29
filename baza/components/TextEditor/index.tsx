import { Box, BoxProps } from "@mantine/core";
import { FC, useCallback, useMemo } from "react";
import { useImageUploaderFather } from "baza/hooks/useImageUploaderFather";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEditorBalloonBlock from "@ckeditor/ckeditor5-build-balloon-block";
import markdown2html from "baza/utils/markdown2html/markdown2html";
import html2markdown from "baza/utils/html2markdown/html2markdown";
import { ContentText } from "../ContentText";

type TextEditorProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
} & BoxProps;

export const TextEditor: FC<TextEditorProps> = ({
  placeholder,
  value = "",
  onChange,
}) => {
  const uploadImage = useImageUploaderFather();

  const _value = useMemo(() => {
    return markdown2html(value);
  }, []);

  const handleChange = useCallback(
    (event: any, editor: any) => {
      onChange(html2markdown(editor.getData()));
    },
    [onChange]
  );

  const MyCustomUploadAdapterPlugin = useMemo(() => {
    class MyUploadAdapter {
      protected loader: any;

      constructor(loader: any) {
        this.loader = loader;
      }

      upload() {
        return this.loader.file
          .then((file: any) => {
            return uploadImage({ file });
          })
          .then((result: any) => ({
            default: result.fileUrl,
          }));
      }

      abort() {
        //
      }
    }

    function MyCustomUploadAdapterPlugin(editor: any) {
      editor.plugins.get("FileRepository").createUploadAdapter = (
        loader: any
      ) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter(loader);
      };
    }

    return MyCustomUploadAdapterPlugin;
  }, [uploadImage]);

  return (
    <ContentText zoomable={false}>
      <Box
        sx={{
          "--ck-focus-ring": "1px solid transparent",
          "--ck-inner-shadow": "none",
        }}
      >
        <CKEditor
          editor={CKEditorBalloonBlock}
          data={_value}
          config={{
            placeholder,
            extraPlugins: [MyCustomUploadAdapterPlugin],
          }}
          onChange={handleChange}
        />
      </Box>
    </ContentText>
  );
};
