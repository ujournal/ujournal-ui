import { LemmyHttp } from "ujournal-lemmy-js-client";
import { createContext, useContext } from "react";

const baseUrl = "/_api";

export const lemmyHttpClient = new LemmyHttp(baseUrl);

export const LemmyClientContext = createContext(lemmyHttpClient);

export const useLemmyClient = () => {
  return useContext(LemmyClientContext);
};
