import { ColorScheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useCallback } from "react";

export const useColorSchemeLocalStorage = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = useCallback(
    (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === "dark" ? "light" : "dark")),
    [colorScheme, setColorScheme]
  );

  return {
    colorScheme,
    toggleColorScheme,
  };
};
