export function parseListToMarkdown(blocks: any) {
  let items = {};
  switch (blocks.style) {
    case "unordered":
      items = blocks.items.map((item: any) => `* ${item}`);

      return items;
    case "ordered":
      items = blocks.items.map(
        (item: any, index: any) => `${index + 1} ${item}`
      );

      return items;
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
