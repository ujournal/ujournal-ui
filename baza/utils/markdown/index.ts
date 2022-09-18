import markdownIt from "markdown-it";
import markdownItContainer from "markdown-it-container";
import markdown_it_footnote from "markdown-it-footnote";
import markdown_it_html5_embed from "markdown-it-html5-embed";
import markdown_it_sub from "markdown-it-sub";
import markdown_it_sup from "markdown-it-sup";
import markdown_it_video from "markdown-it-video";

export const markdown = new markdownIt({
  html: false,
  linkify: true,
  typographer: true,
})
  .use(markdown_it_sub)
  .use(markdown_it_sup)
  .use(markdown_it_footnote)
  .use(markdown_it_html5_embed, {
    html5embed: {
      useImageSyntax: true,
      attributes: {
        audio: 'controls preload="metadata"',
        video:
          'width="100%" max-height="100%" controls loop preload="metadata"',
      },
    },
  })
  .use(markdown_it_video, {
    youtube: { width: 640, height: 390 },
    vimeo: { width: 500, height: 281 },
    vine: { width: 600, height: 600, embed: "simple" },
    prezi: { width: 550, height: 400 },
  })
  .use(markdownItContainer, "spoiler", {
    validate: (params: any) => {
      return params.trim().match(/^spoiler\s+(.*)$/);
    },

    render: (tokens: any, idx: any) => {
      var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<details><summary> ${markdown.utils.escapeHtml(
          m[1]
        )} </summary>\n`;
      }

      // closing tag
      return "</details>\n";
    },
  });

const renderImageDefault = markdown.renderer.rules.image as any;

markdown.renderer.rules.image = (tokens, idx, options, env, self) => {
  console.log(tokens, idx, options, env, self);
  return `<div class="image-outer"><div class="image">${renderImageDefault(
    tokens,
    idx,
    options,
    env,
    self
  )}</div>${
    tokens.length > 0 && tokens[0].content
      ? `<div class="image-caption">${tokens[0].content}</div>`
      : ""
  }</div>`;
};
