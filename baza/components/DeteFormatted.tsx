import { Tooltip, Text } from "@mantine/core";
import { intervalToDuration } from "date-fns";
import { useState } from "react";
import { useCallback } from "react";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

export const DateFormatted: FC<{ date: Date }> = ({ date }) => {
    const {t} = useTranslation();
    const [displayFull, setDisplayFull] = useState<boolean>(false);

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
                            ? t("intlRelativeTime", {
                                value: publishInterval.days * -1,
                            })
                            : publishInterval.hours > 0
                                ? publishInterval.hours + " год."
                                : publishInterval.minutes + " хв."
                }
            </Text>
        </Tooltip>
    );
};
