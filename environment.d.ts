declare namespace NodeJS {
  interface ProcessEnv {
    BASE_PATCH: string | undefined;
    NEXT_PUBLIC_LEMMY_API_URL: string;
    NEXT_PUBLIC_PICTRS_API_URL: string;
    NEXT_PUBLIC_LEMMY_API_PROXY_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_MENTIONS_DOMAIN: string;
    NEXT_PUBLIC_GTAG: string;
    NEXT_PUBLIC_TITLE: string;
    NEXT_PUBLIC_COMMUNITY_WITH_HEADER: string;
  }
}
