export function parseParagraphToMarkdown(blocks: any) {
  return `${blocks.text}\n`;
}

export function parseMarkdownToParagraph(blocks: any) {
  if (blocks.type === "paragraph") {
    const item = blocks.children.find((item: any) => item.type === "image");

    if (item) {
      return {
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

    return {
      data: {
        text: blocks.children
          .map((item: any) => {
            if (item.type === "link") {
              return `<a href="${item.url}">${item.children[0].value}</a>`;
            } else if (item.type === "text") {
              return item.value;
            } else if (item.type === "strong") {
              return `<b>${item.children[0].value}</b>`;
            } else if (item.type === "emphasis") {
              return `<i>${item.children[0].value}</i>`;
            }

            return item.value || item.children?.at(0).value;
          })
          .filter(Boolean)
          .join(""),
      },
      type: "paragraph",
    };
  } else if (["strong", "emphasis"].includes(blocks.type)) {
  }
}
