import { Global } from "@mantine/core";
import bold from "../fonts/e-Ukraine/e-Ukraine-Bold.otf";
import ultraLight from "../fonts/e-Ukraine/e-Ukraine-UltraLight.otf";
import thin from "../fonts/e-Ukraine/e-Ukraine-Thin.otf";
import light from "../fonts/e-Ukraine/e-Ukraine-Light.otf";
import regular from "../fonts/e-Ukraine/e-Ukraine-Regular.otf";
import medium from "../fonts/e-Ukraine/e-Ukraine-Medium.otf";

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          "@font-face": {
            fontFamily: "eUkraineUltraLight",
            src: `url('${ultraLight}') format("opentype")`,
            fontWeight: 200,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "eUkraineLight",
            src: `url('${light}') format("opentype")`,
            fontWeight: 300,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "eUkraineThin",
            src: `url('${thin}') format("opentype")`,
            fontWeight: 400,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "eUkraineRegular",
            src: `url('${regular}') format("opentype")`,
            fontWeight: 500,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "eUkraineMedium",
            src: `url('${medium}') format("opentype")`,
            fontWeight: 500,
            fontStyle: "normal",
          },
        },
        {
          "@font-face": {
            fontFamily: "eUkraineBold",
            src: `url('${bold}') format("opentype")`,
            fontWeight: 600,
            fontStyle: "normal",
          },
        },
      ]}
    />
  );
}
