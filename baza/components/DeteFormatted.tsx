import { Tooltip, Text } from "@mantine/core";
import { intervalToDuration } from "date-fns";
import { useState } from "react";
import { useCallback } from "react";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export const DateFormatted: FC<{ date: Date }> = ({ date }) => {
    const {t} = useTranslation();
    const [displayFull, setDisplayFull] = useState<boolean>(false);
    const rtf = new Intl.RelativeTimeFormat(i18n.language, { style: "short" });

    const publishInterval = useMemo(
        () => {
            const {days = 0, hours = 0, minutes = 0} =
                intervalToDuration({
                    start: date,
                    end: new Date(),
                });
            return {days, hours, minutes};
        }, [date]
    );

    const toggleDisplayFull = useCallback(() => {
        setDisplayFull((displayFull) => !displayFull);
    }, []);

    return (
        <Tooltip label={date.toLocaleString()} openDelay={1000}>
            <Text
                sx={{whiteSpace: "nowrap"}}
                color="gray"
                size="sm"
                onClick={toggleDisplayFull}
            >
                {
                    displayFull
                        ? date.toLocaleString()
                        : publishInterval.days > 0
                            ? rtf.format(publishInterval.days * -1, "day")
                            : publishInterval.hours > 0
                                ? rtf.format(publishInterval.hours * -1, "hour")
                                : rtf.format(publishInterval.minutes * -1, "minute")
                }
            </Text>
        </Tooltip>
    );
};
