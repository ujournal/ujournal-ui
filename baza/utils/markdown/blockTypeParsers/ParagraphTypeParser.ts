import TurndownService from "turndown";
import { parseMarkdownToYouTube } from "./YouTubeTypeParser";

const turndown = new TurndownService();

export function parseParagraphToMarkdown(blocks: any) {
  return `${turndown.turndown(blocks.text)}\n`;
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
          },
          caption: item.alt || item.title,
          withBackground: false,
          withBorder: false,
        },
        type: "image",
      };
    }

    if (
      blocks.children.length > 1 &&
      blocks.children[0].type === "text" &&
      blocks.children[0].value === "@" &&
      blocks.children[1].type === "link"
    ) {
      return parseMarkdownToYouTube(blocks);
    }

    return {
      data: {
        text: blocks.children
          .map((item: any) => {
            if (item.type === "link") {
              return `<a href="${item.url}">${item.children[0]?.value}</a>`;
            } else if (item.type === "text") {
              return item.value;
            } else if (item.type === "strong") {
              return `<b>${item.children[0]?.value}</b>`;
            } else if (item.type === "emphasis") {
              return `<i>${item.children[0]?.value}</i>`;
            }

            return item.value || item.children?.at(0).value;
          })
          .filter(Boolean)
          .join(""),
      },
      type: "paragraph",
    };
  }
}
