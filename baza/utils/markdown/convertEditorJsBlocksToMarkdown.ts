import { parseCheckboxToMarkdown } from "./blockTypeParsers/CheckboxTypeParser";
import { parseCodeToMarkdown } from "./blockTypeParsers/CodeTypeParser";
import { parseDelimiterToMarkdown } from "./blockTypeParsers/DelimiterTypeParser";
import { parseHeaderToMarkdown } from "./blockTypeParsers/HeaderTypeParser";
import { parseImageToMarkdown } from "./blockTypeParsers/ImageTypeParser";
import { parseListToMarkdown } from "./blockTypeParsers/ListTypeParser";
import { parseParagraphToMarkdown } from "./blockTypeParsers/ParagraphTypeParser";
import { parseQuoteToMarkdown } from "./blockTypeParsers/QuoteTypeParser";
import { parseYouTubeToMarkdown } from "./blockTypeParsers/YouTubeTypeParser";

export const convertEditorJsToMarkdown = (data: { blocks: any[] }) => {
  const parsedData = data.blocks.map((item: any) => {
    switch (item.type) {
      case "header":
        return parseHeaderToMarkdown(item.data);
      case "paragraph":
        return parseParagraphToMarkdown(item.data);
      case "list":
        return parseListToMarkdown(item.data);
      case "delimiter":
        return parseDelimiterToMarkdown();
      case "image":
        return parseImageToMarkdown(item.data);
      case "quote":
        return parseQuoteToMarkdown(item.data);
      case "checkbox":
        return parseCheckboxToMarkdown(item.data);
      case "code":
        return parseCodeToMarkdown(item.data);
      case "checklist":
        return parseCheckboxToMarkdown(item.data);
      case "youtubeEmbed":
        return parseYouTubeToMarkdown(item.data);
      default:
        break;
    }
  });

  return parsedData.join("\n");
};
