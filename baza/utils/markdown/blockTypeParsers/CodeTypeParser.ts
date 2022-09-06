export function parseCodeToMarkdown(blocks: any) {
  return `\`\`\`\n${blocks.code}\n\`\`\`\n`;
}

export function parseMarkdownToCode(blocks: any) {
  const codeData = {
    data: {
      code: blocks.value,
    },
    type: "code",
  };

  return codeData;
}
