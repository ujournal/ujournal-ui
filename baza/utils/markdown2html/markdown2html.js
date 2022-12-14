/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module markdown-gfm/markdown2html
 */

import { marked } from "marked";
import { cleanupRateFromImageSrc } from "../image";

/**
 * Parses markdown string to an HTML.
 *
 * @param {String} markdown
 * @returns {String}
 */
export default function markdown2html(
  markdown,
  { useImageCaption = false } = {}
) {
  // Overrides.
  marked.use({
    tokenizer: {
      // Disable the autolink rule in the lexer.
      autolink: () => null,
      url: () => null,
    },
    renderer: {
      checkbox(...args) {
        // Remove bogus space after <input type="checkbox"> because it would be preserved
        // by DomConverter as it's next to an inline object.
        return Object.getPrototypeOf(this)
          .checkbox.call(this, ...args)
          .trimRight();
      },

      code(...args) {
        // Since marked v1.2.8, every <code> gets a trailing "\n" whether it originally
        // ended with one or not (see https://github.com/markedjs/marked/issues/1884 to learn why).
        // This results in a redundant soft break in the model when loaded into the editor, which
        // is best prevented at this stage. See https://github.com/ckeditor/ckeditor5/issues/11124.
        return Object.getPrototypeOf(this)
          .code.call(this, ...args)
          .replace("\n</code>", "</code>");
      },

      image(...args) {
        if (useImageCaption) {
          const [href, title, text] = args;
          const _href = cleanupRateFromImageSrc(href);
          const image = Object.getPrototypeOf(this)
            .image.call(this, _href, title, text)
            .replace(
              /<img/,
              '<img crossorigin="anonymous" referrerpolicy="no-referrer"'
            );

          return `<!--IMAGE:BEGIN--><span class="image">${image}${
            text ? `<span class="image-caption">${text}</span>` : ""
          }</span><!--IMAGE:END-->`;
        }

        return Object.getPrototypeOf(this).image.call(this, ...args);
      },
    },
  });

  return marked.parse(markdown, {
    gfm: true,
    breaks: true,
    tables: true,
    xhtml: true,
    headerIds: false,
  });
}

export { marked };
