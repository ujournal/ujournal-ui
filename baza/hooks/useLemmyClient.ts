import { LemmyHttp } from "ujournal-lemmy-js-client";
import { createContext, useContext } from "react";
import {LoginResponse} from "ujournal-lemmy-js-client/dist/interfaces/api/person";

const baseUrl = "/_api";

export declare class GoogleLogin {
    username: string;
    email: string;
    logo_url: string;
    constructor(init: GoogleLogin);
}

export class lemmyHttp2 extends LemmyHttp {
  login_via_google(form: GoogleLogin): Promise<LoginResponse>;
}

export const lemmyHttpClient = new lemmyHttp2(baseUrl);

export const LemmyClientContext = createContext(lemmyHttpClient);

export const useLemmyClient = () => {
  return useContext(LemmyClientContext);
};
