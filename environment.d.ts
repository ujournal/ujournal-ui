declare namespace NodeJS {
  interface ProcessEnv {
    BASE_PATCH: string | undefined;
    NEXT_PUBLIC_LEMMY_API_URL: string;
    NEXT_PUBLIC_PICTRS_API_URL: string;
    NEXT_PUBLIC_LEMMY_API_PROXY_URL: string;
  }
}
