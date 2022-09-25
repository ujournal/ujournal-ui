import styles from "./main.module.css";

export class YouTubeTool {
  data: { url?: string } = {};
  readOnly: boolean = false;
  wrapper: HTMLDivElement | null = null;
  url: string | null = null;
  isEdited: boolean = false;

  /**
   *
   * Get toolbox settings
   *
   * @return {{icon: string, title: string}}
   *
   */
  static get toolbox() {
    return {
      title: "YouTube",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="20" width="30" viewBox="-35.20005 -41.33325 305.0671 247.9995"><path d="M229.763 25.817c-2.699-10.162-10.65-18.165-20.748-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.553 7.652 7.6 15.655 4.903 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.903 56.85C7.6 149.68 15.553 157.681 25.65 160.4c18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.904-56.85 4.904-56.85s0-38.431-4.904-56.85" fill="red"/><path d="M93.333 117.559l61.333-34.89-61.333-34.894z" fill="#fff"/></svg>`,
    };
  }

  /**
   *
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {data: DelimiterData} — previously saved data
   *
   */
  constructor({ data, config, api, readOnly }: any) {
    this.data = data;
    this.readOnly = readOnly;

    this.wrapper = null;
    this.url = null;
    this.isEdited = false;
  }

  /**
   *
   * Return tool's view
   *
   * @returns {HTMLDivElement}
   * @public
   */
  render() {
    this.wrapper = window.document.createElement("div");
    const input = window.document.createElement("input");
    input.value = this.data && this.data.url ? this.data.url : "";
    this.url = input.value;
    input.placeholder = "Paste YouTube url here...";

    this.wrapper?.classList.add(styles.blockWrapper);
    this.wrapper?.appendChild(input);
    this._createIframe(input.value);

    input.addEventListener("change", () => {
      this.isEdited = true;

      this.url = input.value;
      this._createIframe(input.value);
    });
    return this.wrapper;
  }

  /**
   *
   * Create iframe for YouTube embed
   * @private
   * @param {string} url
   *
   */
  _createIframe(url: string) {
    if (!this.wrapper) {
      return;
    }

    const matches = url.match(
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    );

    if (!matches) {
      if (this.isEdited) {
        this.wrapper.querySelector("input")?.classList.add(styles.invalid);
      }

      return;
    }

    this.wrapper.innerHTML = "";

    const plyrContainer = window.document.createElement("div");
    plyrContainer.classList.add(styles.videoWrapper);

    const iframe = window.document.createElement("iframe");
    iframe.setAttribute("src", `https://www.youtube.com/embed/${matches[7]}`);
    iframe.setAttribute("allowfullscreen", "true");

    plyrContainer.appendChild(iframe);
    this.wrapper.appendChild(plyrContainer);
  }

  /**
   * Returns true to notify the core that read-only mode is supported
   *
   * @return {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Return block data
   *
   * @public
   * @param {HTMLDivElement} blockContent - Block wrapper
   * @returns {object}
   */
  save(blockContent: any) {
    return {
      url: this.url,
    };
  }
}
