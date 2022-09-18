import TurndownService from "turndown";
import { markdown } from "..";
import { remark } from "remark";

const turndown = new TurndownService();

export function parseQuoteToMarkdown(blocks: any) {
  return `${turndown
    .turndown(blocks.text)
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n")}\n`;
}

export function parseMarkdownToQuote(blocks: any) {
  let results = {};

  results = {
    data: {
      alignment: "left",
      caption: "",
      text: blocks.children
        .map((item: any) => markdown.render(remark().stringify(item)))
        .join("\n"),
    },
    type: "quote",
  };

  return results;
}
