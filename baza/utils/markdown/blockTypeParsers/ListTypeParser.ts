export function parseListToMarkdown(blocks: any) {
  switch (blocks.style) {
    case "unordered":
      return blocks.items.map((item: any) => `* ${item}`).join("\n");

    case "ordered":
      return blocks.items
        .map((item: any, index: any) => `${index + 1} ${item}`)
        .join("\n");

    default:
      break;
  }
}

export function parseMarkdownToList(blocks: any) {
  let listData = {};
  const itemData: any = [];

  blocks.children.forEach((items: any) => {
    items.children.forEach((listItem: any) => {
      listItem.children.forEach((listEntry: any) => {
        itemData.push(listEntry.value);
      });
    });
  });

  listData = {
    data: {
      items: itemData,
      style: blocks.ordered ? "ordered" : "unordered",
    },
    type: "list",
  };

  return listData;
}
