import { FC } from "react";
import { CustomFonts } from "baza/components/CustomFonts";

export const AppMeta: FC = () => {
  return (
    <>
      <CustomFonts />

      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/meta/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/meta/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/meta/favicon-16x16.png`}
      />
      <link
        rel="manifest"
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json`}
      />
      <link
        rel="mask-icon"
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/meta/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
};
