export function parseYouTubeToMarkdown(blocks: any) {
  return `@[youtube](${blocks.url || ""})`.concat("\n");
}

export function parseMarkdownToYouTube(blocks: any) {
  let results = {};

  blocks.children.forEach((item: any) => {
    if (
      item.type === "link" &&
      item.url.startsWith("https://www.youtube.com/watch")
    ) {
      results = {
        data: {
          url: item.url,
        },
        type: "youtubeEmbed",
      };
    }
  });

  return results;
}
