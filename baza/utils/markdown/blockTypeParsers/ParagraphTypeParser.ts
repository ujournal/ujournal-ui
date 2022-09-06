export function parseParagraphToMarkdown(blocks: any) {
  return `${blocks.text}\n`;
}

export function parseMarkdownToParagraph(blocks: any) {
  let paragraphData = {};
  if (blocks.type === "paragraph") {
    blocks.children.forEach((item: any) => {
      if (item.type === "text") {
        paragraphData = {
          data: {
            text: item.value,
          },
          type: "paragraph",
        };
      }
      if (item.type === "image") {
        paragraphData = {
          data: {
            stretched: false,
            file: {
              url: item.url,
              caption: item.title,
            },
            withBackground: false,
            withBorder: false,
          },
          type: "image",
        };
      }
    });
  }
  return paragraphData;
}
