import { Global } from "@mantine/core";

export function CustomFonts() {
  return (
    <>
      <Global
        styles={[
          {
            "@font-face": {
              fontFamily: "eUkraineRegular",
              src: `url('${process.env.NEXT_PUBLIC_BASE_URL}/fonts/e-Ukraine/e-Ukraine-Regular.otf') format("opentype")`,
              fontWeight: 500,
              fontStyle: "normal",
            },
          },
        ]}
      />
    </>
  );
}
