export function parseQuoteToMarkdown(blocks: any) {
  return `> ${blocks.text}\n`;
}

export function parseMarkdownToQuote(blocks: any) {
  let quoteData = {};

  blocks.children.forEach((items: any) => {
    items.children.forEach((listItem: any) => {
      if (listItem.type === "text") {
        quoteData = {
          data: {
            alignment: "left",
            caption: "",
            text: listItem.value,
          },
          type: "quote",
        };
      }
    });
  });

  return quoteData;
}
