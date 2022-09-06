import { remark } from "remark";
import { parseMarkdownToCode } from "./blockTypeParsers/CodeTypeParser";
import { parseMarkdownToDelimiter } from "./blockTypeParsers/DelimiterTypeParser";
import { parseMarkdownToHeader } from "./blockTypeParsers/HeaderTypeParser";
import { parseMarkdownToList } from "./blockTypeParsers/ListTypeParser";
import { parseMarkdownToParagraph } from "./blockTypeParsers/ParagraphTypeParser";
import { parseMarkdownToQuote } from "./blockTypeParsers/QuoteTypeParser";

export const convertMarkdownToEditorJs = (content: string) => {
  const data: any[] = [];

  const parsedMarkdown = remark().parse(content);

  parsedMarkdown.children.forEach((item, index) => {
    switch (item.type) {
      case "heading":
        return data.push(parseMarkdownToHeader(item));
      case "paragraph":
        return data.push(parseMarkdownToParagraph(item));
      case "list":
        return data.push(parseMarkdownToList(item));
      case "thematicBreak":
        return data.push(parseMarkdownToDelimiter());
      case "code":
        return data.push(parseMarkdownToCode(item));
      case "blockquote":
        return data.push(parseMarkdownToQuote(item));
      default:
        break;
    }
  });

  return {
    blocks: data.filter((value) => Object.keys(value).length !== 0),
  };
};
