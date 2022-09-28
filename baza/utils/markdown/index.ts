import markdownIt from "markdown-it";
import markdownItContainer from "markdown-it-container";
import markdown_it_footnote from "markdown-it-footnote";
import markdown_it_html5_embed from "markdown-it-html5-embed";
import markdown_it_sub from "markdown-it-sub";
import markdown_it_sup from "markdown-it-sup";
import markdown_it_video from "markdown-it-video";
import mentions from "markdown-it-mentions";

const parseUrlForMentions = (username: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/user/?username=${username}`;
};

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
  .use(mentions, { parseURL: parseUrlForMentions, external: true })
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
  let ratio = 1;

  if (tokens.length > 0) {
    const [[attr, src = ""]] = tokens[0].attrs || [[]];
    const matches = src.match(/\#r=([\d\.]+)$/);
    const [, _ratio] = matches || [-1, 1];
    ratio = Number(_ratio);

    if (tokens[0].attrs && tokens[0].attrs.length > 0) {
      tokens[0].attrs[0][1] = tokens[0].attrs[0][1].replace(
        /\#r=([\d\.]+)$/,
        ""
      );
    }
  }

  return `<div class="image-outer"><div class="image" style="--image-height: ${
    100 * ratio
  }%">${renderImageDefault(tokens, idx, options, env, self)}</div>${
    tokens.length > 0 &&
    tokens[0].attrs &&
    tokens[0].attrs.length > 0 &&
    tokens[0].attrs[1] &&
    tokens[0].content
      ? `<div class="image-caption">${tokens[0].content}</div>`
      : ""
  }</div><div style="display:none;">img</div>`;
};
