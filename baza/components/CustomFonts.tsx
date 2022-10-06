import { Global } from "@mantine/core";

export function CustomFonts() {
  return (
    <>
      <link
        href="//fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
        type="text/css"
      />
      <Global
        styles={[
          // {
          //   "@font-face": {
          //     fontFamily: "eUkraineUltraLight",
          //     src: `url('${process.env.NEXT_PUBLIC_BASE_URL}/fonts/e-Ukraine/e-Ukraine-UltraLight.otf') format("opentype")`,
          //     fontWeight: 200,
          //     fontStyle: "normal",
          //   },
          // },
          // {
          //   "@font-face": {
          //     fontFamily: "eUkraineLight",
          //     src: `url('${process.env.NEXT_PUBLIC_BASE_URL}/fonts/e-Ukraine/e-Ukraine-Light.otf') format("opentype")`,
          //     fontWeight: 300,
          //     fontStyle: "normal",
          //   },
          // },
          // {
          //   "@font-face": {
          //     fontFamily: "eUkraineThin",
          //     src: `url('${process.env.NEXT_PUBLIC_BASE_URL}/fonts/e-Ukraine/e-Ukraine-Thin.otf') format("opentype")`,
          //     fontWeight: 400,
          //     fontStyle: "normal",
          //   },
          // },
          {
            "@font-face": {
              fontFamily: "eUkraineRegular",
              src: `url('${process.env.NEXT_PUBLIC_BASE_URL}/fonts/e-Ukraine/e-Ukraine-Regular.otf') format("opentype")`,
              fontWeight: 500,
              fontStyle: "normal",
            },
          },
          // {
          //   "@font-face": {
          //     fontFamily: "eUkraineMedium",
          //     src: `url('${process.env.NEXT_PUBLIC_BASE_URL}/fonts/e-Ukraine/e-Ukraine-Medium.otf') format("opentype")`,
          //     fontWeight: 500,
          //     fontStyle: "normal",
          //   },
          // },
          // {
          //   "@font-face": {
          //     fontFamily: "eUkraineBold",
          //     src: `url('${process.env.NEXT_PUBLIC_BASE_URL}/fonts/e-Ukraine/e-Ukraine-Bold.otf') format("opentype")`,
          //     fontWeight: 600,
          //     fontStyle: "normal",
          //   },
          // },
        ]}
      />
    </>
  );
}
