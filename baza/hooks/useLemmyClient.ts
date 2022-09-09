import { LemmyHttp } from "ujournal-lemmy-js-client";
import { createContext, useContext } from "react";

export const lemmyHttpClient = new LemmyHttp(
  process.env.NEXT_PUBLIC_LEMMY_API_URL
);

export const LemmyClientContext = createContext(lemmyHttpClient);

export const useLemmyClient = () => {
  return useContext(LemmyClientContext);
};
