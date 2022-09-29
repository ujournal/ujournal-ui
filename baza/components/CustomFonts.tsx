import { Global } from "@mantine/core";
import bold from "../fonts/e-Ukraine/e-Ukraine-Bold.otf";
import light from "../fonts/e-Ukraine/e-Ukraine-Light.otf";
import regular from "../fonts/e-Ukraine/e-Ukraine-Regular.otf";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "eUkraineLight",
            src: `url('${light}') format("opentype")`,
            // fontWeight: 200,
            // fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "eUkraineRegular",
            src: `url('${regular}') format("opentype")`,
            // fontWeight: 400,
            // fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "eUkraineBold",
            src: `url('${bold}') format("opentype")`,
            // fontWeight: 500,
            // fontStyle: "normal",
          },
        },
      ]}
    />
  );
}
