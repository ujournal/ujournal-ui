import { useInterval } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const useIntervalPhrases = (phrases: string[], delay: number = 5000) => {
  const [index, setIndex] = useState(0);

  const interval = useInterval(() => {
    setIndex((index) => (index + 1 >= phrases.length ? 0 : index + 1));
  }, delay);

  useEffect(() => {
    interval.start();

    return interval.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return phrases[index];
};
