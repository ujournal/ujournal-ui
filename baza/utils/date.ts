import i18n from "baza/i18n";

export const getTodayInLocale = () => {
  const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: "auto" });
  const [{ value }] = rtf.formatToParts(-0, "day");
  return value;
};
