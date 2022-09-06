export function parseCheckboxToMarkdown(blocks: any) {
  let items: any = {};

  items = blocks.items.map((item: any) => {
    if (item.checked === true) {
      return `- [x] ${item.text}`;
    }
    return `- [ ] ${item.text}`;
  });

  return items.join("\n");
}
