import { Box, BoxProps } from "@mantine/core";
import { FC, useCallback, useMemo } from "react";
import { useImageUploaderFather } from "baza/hooks/useImageUploaderFather";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CKEditorBalloonBlock from "@ckeditor/ckeditor5-build-balloon-block";
import markdown2html from "baza/utils/markdown2html/markdown2html";
import html2markdown from "baza/utils/html2markdown/html2markdown";
import { ContentText } from "../ContentText";
import "@ckeditor/ckeditor5-build-balloon-block/build/translations/uk.js";

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
    return markdown2html(
      value.replace(
        /\[embed\]\((.+?)\)/gm,
        '<figure class="media"><oembed url="$1"></oembed></figure>'
      )
    );
  }, []);

  const handleChange = useCallback(
    (event: any, editor: any) => {
      onChange(
        html2markdown(
          editor
            .getData()
            .replace(
              /<figure class="media"><oembed url="(.+?)"><\/oembed><\/figure>/gm,
              "!!!EMBED$1EMBED!!!"
            )
        ).replace(/!!!EMBED(.+?)EMBED!!!/gm, "[embed]($1)")
      );
    },
    [onChange]
  );

  const CustomUploadAdapterPlugin = useMemo(() => {
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

    return (editor: any) => {
      editor.plugins.get("FileRepository").createUploadAdapter = (
        loader: any
      ) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter(loader);
      };
    };
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
            extraPlugins: [CustomUploadAdapterPlugin],
            blockToolbar: {
              items: [
                "heading",
                "paragraph",
                "heading2",
                "heading3",
                "|",
                "bulletedList",
                "numberedList",
                "|",
                // "uploadImage",
                "insertImage",
                "insertImage",
                "blockQuote",
                "insertTable",
                "mediaEmbed",
                "|",
                "undo",
                "redo",
              ],
            },
            image: {
              toolbar: ["imageTextAlternative"],
            },
            heading: {
              options: [
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
              ],
            },
            language: "uk",
          }}
          onChange={handleChange}
        />
      </Box>
    </ContentText>
  );
};
