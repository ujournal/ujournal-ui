import { markdown } from "baza/utils/markdown";
import { createContext, useContext } from "react";

export { markdown };

export const MarkdownContext = createContext(markdown);

export const useMarkdown = () => {
  return useContext(MarkdownContext);
};
