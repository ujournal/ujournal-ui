import { Tooltip, Text, TextProps } from "@mantine/core";
import { intervalToDuration, isValid } from "date-fns";
import { useState } from "react";
import { useCallback } from "react";
import { FC, useMemo } from "react";
import i18n from "i18next";

export const DateFormatted: FC<{ date: Date } & TextProps> = ({
  date,
  ...props
}) => {
  const [displayFull, setDisplayFull] = useState<boolean>(false);

  const publishInterval = useMemo(() => {
    if (!isValid(date)) {
      return undefined;
    }

    const {
      days = 0,
      hours = 0,
      minutes = 0,
    } = intervalToDuration({
      start: date,
      end: new Date(),
    });

    const rtf = new Intl.RelativeTimeFormat(i18n.language, { style: "short" });

    return displayFull
      ? date.toLocaleString()
      : days > 0
      ? rtf.format(days * -1, "day")
      : hours > 0
      ? rtf.format(hours * -1, "hour")
      : rtf.format(minutes * -1, "minute");
  }, [date, displayFull]);

  const toggleDisplayFull = useCallback(() => {
    setDisplayFull((displayFull) => !displayFull);
  }, []);

  return (
    <Tooltip label={date.toLocaleString()} openDelay={1000}>
      <Text
        sx={{ whiteSpace: "nowrap" }}
        color="gray"
        size="sm"
        {...props}
        onClick={toggleDisplayFull}
      >
        {publishInterval}
      </Text>
    </Tooltip>
  );
};
