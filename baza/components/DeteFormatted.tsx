import { Tooltip, Text, TextProps, useMantineTheme } from "@mantine/core";
import { intervalToDuration, isValid } from "date-fns";
import { useState } from "react";
import { useCallback } from "react";
import { FC, useMemo } from "react";
import i18n from "i18next";
import { merge } from "lodash";

export const DateFormatted: FC<{ date: Date } & TextProps> = ({
  date,
  ...props
}) => {
  const [displayFull, setDisplayFull] = useState<boolean>(false);

  const publishInterval = useMemo(() => {
    if (!isValid(date)) {
      return "";
    }

    const {
      months = 0,
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
      : months > 0
      ? rtf.format(months * -1, "month")
      : days > 0
      ? rtf.format(days * -1, "day")
      : hours > 0
      ? rtf.format(hours * -1, "hour")
      : rtf.format(minutes * -1, "minute");
  }, [date, displayFull]);

  const toggleDisplayFull = useCallback(() => {
    setDisplayFull((displayFull) => !displayFull);
  }, []);

  const theme = useMantineTheme();
  const sx = merge(
    ((theme) => ({
      color:
        theme.colorScheme === "light"
          ? theme.colors.gray[5]
          : theme.colors.gray[7],
      whiteSpace: "nowrap",
    }))(theme),
    props.sx instanceof Function ? props.sx(theme) : props.sx
  );

  return (
    <Tooltip label={date.toLocaleString()} openDelay={1000}>
      <Text size="sm" {...props} sx={sx} onClick={toggleDisplayFull}>
        {publishInterval}
      </Text>
    </Tooltip>
  );
};
