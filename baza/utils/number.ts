export const formatShortNum = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
};
