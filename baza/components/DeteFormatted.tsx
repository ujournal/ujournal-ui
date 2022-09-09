import { Tooltip, Text } from "@mantine/core";
import { getTodayInLocale } from "baza/utils/date";
import { intervalToDuration } from "date-fns";
import { useState } from "react";
import { useCallback } from "react";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

export const DateFormatted: FC<{ date: Date }> = ({ date }) => {
  const { t } = useTranslation();
  const [displayFull, setDisplayFull] = useState<boolean>(false);

  const daysAgo = useMemo(
    () =>
      intervalToDuration({
        start: date,
        end: new Date(),
      }).days || 0,
    [date]
  );

  const toggleDisplayFull = useCallback(() => {
    setDisplayFull((displayFull) => !displayFull);
  }, []);

  return (
    <Tooltip label={date.toLocaleString()} openDelay={1000}>
      <Text
        sx={{ whiteSpace: "nowrap" }}
        color="gray"
        size="sm"
        onClick={toggleDisplayFull}
      >
          {
              displayFull
                  ? date.toLocaleString()
                  : daysAgo > 0
                      ? t("intlRelativeTime", {
                          value: daysAgo * -1,
                      })
                      : (new Date().getUTCHours() - date.getHours()) > 0
                          ? Math.abs((new Date().getUTCHours() - date.getHours())) + " год."
                          : Math.abs((new Date().getUTCMinutes() - date.getMinutes())) + " хв."
          }
      </Text>
    </Tooltip>
  );
};
